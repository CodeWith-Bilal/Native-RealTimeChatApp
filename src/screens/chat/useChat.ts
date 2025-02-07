import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import {
  fetchMessages,
  listenToMessages,
  sendMessage,
} from '../../services/messages';
import {addMessage} from '../../store/slices/chats.slice';
import useAuth from '../../hooks/useAuth';
import {Message} from '../../types/firestoreService';
import {useAppDispatch, useAppSelector} from '../../store/store';

const appChat = (chatId: string, participantUid: string) => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(state => state.chat.messages[chatId] || []);
  const {user} = useAuth();
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const messages = await fetchMessages(chatId);
        dispatch({type: 'chat/setMessages', payload: {chatId, messages}});
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    loadMessages();
  }, [chatId, dispatch]);

  useEffect(() => {
    const unsubscribe = listenToMessages(chatId, newMessages => {
      dispatch({
        type: 'chat/setMessages',
        payload: {chatId, messages: newMessages},
      });
    });

    return () => {
      unsubscribe();
    };
  }, [chatId, dispatch]);

  const handleSend = async () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: `${Date.now()}`,
        senderId: user?.uid || '',
        text: newMessage,
        contentType: 'text',
        timestamp: firestore.FieldValue.serverTimestamp(),
        status: {sender: 'sent', receiver: 'unread'},
      };

      dispatch(addMessage({chatId, message}));
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

  return {messages, newMessage, setNewMessage, handleSend, user};
};

export default appChat;
