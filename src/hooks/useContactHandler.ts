import { useState } from 'react';
import { createNewChat } from '../hooks/useChat';
import { userProfile } from '../types/profile';
import useAuth from './useAuth';
import appNavigate from './useNavigationHook';
import { ToastAndroid } from 'react-native';

const useContactHandler = () => {
  const { navigation } = appNavigate();
  const [newChatLoader, setNewChatLoader] = useState(false);
  const { user } = useAuth();

  const showToast = (message: string) => {
    ToastAndroid.show(message, ToastAndroid.LONG);
  };

  const handleContactClick = async (contactId: string, participant: userProfile) => {
    if (!user?.uid) {
      showToast('User not authenticated.');
      return;
    }

    try {
      setNewChatLoader(true);
      const userChats = user.chats || [];

      const existingChat = userChats.find(chatId => chatId === contactId);

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
        if (chatId) {
          navigation.navigate('Chat', {
            chatId,
            participant: {
              uid: participant.uid,
              displayName: participant.displayName,
              photoURL: participant.photoURL || null,
              status: participant.status,
            },
          });
        } else {
          showToast('Failed to create a new chat.');
        }
      }
    } catch (error) {
      showToast('An error occurred while starting the chat.');
    } finally {
      setNewChatLoader(false);
    }
  };

  return { handleContactClick, loader: newChatLoader };
};

export default useContactHandler;
