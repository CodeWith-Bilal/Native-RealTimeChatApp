import {useState} from 'react';
import {createNewChat} from '../hooks/useChat';
import {userProfile} from '../types/profile';
import useAuth from './useAuth';
import appNavigate from './useNavigationHook';
import {showToast} from '../components/Toast';

const useContactHandler = () => {
  const {navigation} = appNavigate();
  const [newChatLoader, setNewChatLoader] = useState(false);
  const {user} = useAuth();

  const handleContactClick = async (
    contactId: string,
    participant: userProfile,
  ) => {
    if (!user?.uid) return;

    try {
      setNewChatLoader(true);
      const userChats = user.chats;
      const existingChat = userChats?.find(chatId =>
        chatId?.includes(contactId),
      );

      if (existingChat) {
        navigation.navigate('Chat', {
          chatId: existingChat,
          participant: {
            uid: participant.uid,
            displayName: participant.displayName,
            photoURL: participant.photoURL || null,
            status: participant.status,
          },
        });
      } else {
        const chatId = await createNewChat([user.uid, contactId]);
        navigation.navigate('Chat', {
          chatId,
          participant: {
            uid: participant.uid,
            displayName: participant.displayName,
            photoURL: participant.photoURL || null,
            status: participant.status,
          },
        });
      }
    } catch (error) {
      showToast('Error', 'An error occurred while starting chat', 'error');
      console.error('Error starting or navigating to chat:', error);
    } finally {
      setNewChatLoader(false);
    }
  };

  return {handleContactClick, loader: newChatLoader};
};

export default useContactHandler;
