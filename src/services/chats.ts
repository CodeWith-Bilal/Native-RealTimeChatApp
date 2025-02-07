import firestore from '@react-native-firebase/firestore';
import { fetchUser } from './user';
import { Chat } from '../types/firestoreService';

export const createNewChat = async (
  participants: string[],
): Promise<string> => {
  const [user1, user2] = participants.sort();
  const chatId = user1 + user2;

  const chatRef = firestore().collection('chats').doc(chatId);
  const usersRef = firestore().collection('users');

  try {
    const chatDoc = await chatRef.get();

    if (!chatDoc.exists) {
      await chatRef.set({
        participants,
        lastMessage: '',
        lastActive: Date.now(),
        notificationStatus: 'allowed',
        unreadCount: { [user1]: 0, [user2]: 0 },
      });

      await Promise.all(
        participants.map(uid =>
          usersRef.doc(uid).update({
            chats: firestore.FieldValue.arrayUnion(chatId),
          }),
        ),
      );
    }

    return chatId;
  } catch (error) {
    console.error('Error creating chat:', error);
    throw error;
  }
};

export const fetchChats = (userId: string, callback: (chats: Chat[]) => void) => {
  const unsubscribe = firestore()
    .collection('chats')
    .where('participants', 'array-contains', userId)
    .orderBy('lastActive', 'desc')
    .onSnapshot(
      async snapshot => {
        console.log('Snapshot received:', snapshot.docs.length); // Log number of docs
        const chats = await Promise.all(snapshot.docs.map(async doc => {
          const chatData = doc.data();
          const participantsDetails = await Promise.all(
            (chatData.participants || []).map(async (participantId: string) => {
              try {
                const user = await fetchUser(participantId);
                return { uid: participantId, ...user };
              } catch (error) {
                console.error(`Error fetching user ${participantId}:`, error);
                return { uid: participantId, name: 'Unknown', createdAt: '', email: '', status: '' }; // Fallback
              }
            })
          );
          return {
            id: doc.id,
            participants: chatData.participants || [],
            lastMessage: chatData.lastMessage || '',
            unreadMessages: chatData.unreadCount?.[userId] || 0,
            notificationStatus: chatData.notificationStatus ?? true,
            lastActive: chatData.lastActive?.toDate().toISOString() || null,
            participantsDetails,
          };
        }));

        console.log('Chats fetched:', chats); // Log fetched chats
        callback(chats);
      },
      error => {
        console.error('Error fetching chats:', error);
        callback([]);
      },
    );

  return unsubscribe;
};

export const listenToChats = (
  userId: string,
  callback: (chats: Chat[]) => void
) => {
  return firestore()
    .collection('chats')
    .where('participants', 'array-contains', userId)
    .orderBy('lastActive', 'desc')
    .onSnapshot(
      async snapshot => {
        const chats = await Promise.all(snapshot.docs.map(async doc => {
          const chatData = doc.data();
          const participantsDetails = await Promise.all(
            (chatData.participants || []).map(async (participantId: string) => {
              const user = await fetchUser(participantId);
              return { uid: participantId, ...user };
            })
          );
          return {
            id: doc.id,
            participants: chatData.participants || [],
            lastMessage: chatData.lastMessage || '',
            unreadMessages: chatData.unreadCount?.[userId] || 0,
            notificationStatus: chatData.notificationStatus ?? true,
            lastActive: chatData.lastActive?.toDate().toISOString() || null,
            participantsDetails,
          };
        }));

        callback(chats);
      },
      error => {
        console.error('Error listening to chats:', error);
        callback([]);
      }
    );
};

export const deleteChat = async (chatId: string, participants: string[]) => {
  const chatRef = firestore().collection('chats').doc(chatId);
  const usersRef = firestore().collection('users');

  try {
    const messagesRef = chatRef.collection('messages');
    const querySnapshot = await messagesRef.get();
    await Promise.all(querySnapshot.docs.map(d => d.ref.delete()));

    await chatRef.delete();

    await Promise.all(
      participants.map(uid =>
        usersRef.doc(uid).update({
          chats: firestore.FieldValue.arrayRemove(chatId),
        }),
      ),
    );

    console.log(`Chat ${chatId} deleted successfully`);
  } catch (error) {
    console.error('Error deleting chat:', error);
    throw error;
  }
};
