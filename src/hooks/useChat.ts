import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { fetchMessages, listenToMessages, sendMessage } from '../services/messages';
import { addMessage } from '../store/slices/chats.slice';
import useAuth from './useAuth';
import { Message, Chat } from '../types/firestoreService';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchUser } from '../services/user';
// import { fetchUser } from './';

const useChat = (chatId: string, participantUid: string) => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(state => state.chat.messages[chatId] || []);
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const fetchedMessages = await fetchMessages(chatId);
        dispatch({ type: 'chat/setMessages', payload: { chatId, messages: fetchedMessages } });
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    loadMessages();
  }, [chatId, dispatch]);

  useEffect(() => {
    const unsubscribe = listenToMessages(chatId, newMessages => {
      dispatch({ type: 'chat/setMessages', payload: { chatId, messages: newMessages } });
    });
    return () => unsubscribe();
  }, [chatId, dispatch]);

  const handleSend = async () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: `${Date.now()}`,
        senderId: user?.uid || '',
        text: newMessage,
        contentType: 'text',
        timestamp: firestore.FieldValue.serverTimestamp(),
        status: { sender: 'sent', receiver: 'unread' },
      };

      dispatch(addMessage({ chatId, message }));
      setNewMessage('');

      try {
        if (user?.uid) {
          await sendMessage(participantUid, user?.uid, message);
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return { messages, newMessage, setNewMessage, handleSend, user };
};

export const createNewChat = async (participants: string[]): Promise<string> => {
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

      await Promise.all(participants.map(uid =>
        usersRef.doc(uid).update({
          chats: firestore.FieldValue.arrayUnion(chatId),
        }),
      ));
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
    .onSnapshot(async snapshot => {
      const chats = await Promise.all(snapshot.docs.map(async doc => {
        const chatData = doc.data();
        const participantsDetails = await Promise.all(
          (chatData.participants || []).map(async (participantId: string) => {
            try {
              const user = await fetchUser(participantId);
              return { uid: participantId, ...user };
            } catch (error) {
              console.error(`Error fetching user ${participantId}:`, error);
              return { uid: participantId, name: 'Unknown', createdAt: '', email: '', status: '' };
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
      callback(chats);
    }, error => {
      console.error('Error fetching chats:', error);
      callback([]);
    });

  return unsubscribe;
};

export const listenToChats = (userId: string, callback: (chats: Chat[]) => void) => {
  return firestore()
    .collection('chats')
    .where('participants', 'array-contains', userId)
    .orderBy('lastActive', 'desc')
    .onSnapshot(async snapshot => {
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
    }, error => {
      console.error('Error listening to chats:', error);
      callback([]);
    });
};

export const deleteChat = async (chatId: string, participants: string[]) => {
  const chatRef = firestore().collection('chats').doc(chatId);
  const usersRef = firestore().collection('users');

  try {
    const messagesRef = chatRef.collection('messages');
    const querySnapshot = await messagesRef.get();
    await Promise.all(querySnapshot.docs.map(d => d.ref.delete()));
    await chatRef.delete();
    await Promise.all(participants.map(uid =>
      usersRef.doc(uid).update({
        chats: firestore.FieldValue.arrayRemove(chatId),
      }),
    ));
    console.log(`Chat ${chatId} deleted successfully`);
  } catch (error) {
    console.error('Error deleting chat:', error);
    throw error;
  }
};

export default useChat;
