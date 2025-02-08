import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {fetchChats} from '../../hooks/useChat';
import {Chat} from '../../types/firestoreService';
import {setChats} from '../../store/slices/chats.slice';

const useHome = () => {
  const [chatLoader, setChatLoader] = useState(true);
  const {chats} = useAppSelector(state => state.chat);
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user.uid) return;

    setChatLoader(true);

    const unsubscribe = fetchChats(user.uid, (chats: Chat[]) => {
      try {
        const chatMap = chats.reduce((acc, chat) => {
          acc[chat.id] = chat;
          return acc;
        }, {} as Record<string, Chat>);

        dispatch(setChats(chatMap));
      } catch (error) {
        console.error('Error fetching chats:', error);
      } finally {
        setChatLoader(false);
      }
    });

    return () => unsubscribe();
  }, [user.uid, dispatch]);

  return {chats, chatLoader};
};

export default useHome;
