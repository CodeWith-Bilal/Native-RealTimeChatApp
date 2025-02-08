import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {WritableDraft} from 'immer';
import {AppThunk} from '../store';
import {
  createNewChat as createChat,
  fetchChats,
  createNewChat,
  deleteChat,
} from '../../hooks/useChat';
import {Chat, Message} from '../../types/firestoreService';
import {Timestamp} from '@react-native-firebase/firestore';

interface ChatState {
  chats: Record<string, Chat>;
  messages: Record<string, Message[]>;
  error: string | null;
}

const initialState: ChatState = {
  chats: {},
  messages: {},
  error: null,
};

export const deleteChatFromFirebase =
  (chatId: string, participants: string[]): AppThunk =>
  async dispatch => {
    dispatch(setError(null));
    try {
      await deleteChat(chatId, participants);
      dispatch(deleteChatFromStore(chatId));
    } catch (error) {
      dispatch(
        setError(
          error instanceof Error ? error.message : 'Failed to delete chat',
        ),
      );
    }
  };

export const fetchUserChats =
  (userId: string): AppThunk =>
  async dispatch => {
    dispatch(setError(null));
    try {
      const chats = await new Promise<Chat[]>((resolve, reject) => {
        fetchChats(userId, (chats: Chat[]) => {
          resolve(chats);
        });
      });
      const chatMap = chats.reduce((acc: Record<string, Chat>, chat: Chat) => {
        acc[chat.id] = chat;
        return acc;
      }, {} as Record<string, Chat>);
      dispatch(setChats(chatMap));
    } catch (error) {
      dispatch(
        setError(
          error instanceof Error ? error.message : 'Failed to fetch chats',
        ),
      );
    }
  };

export const startChat =
  (userId: string, contactId: string): AppThunk =>
  async dispatch => {
    dispatch(setError(null));
    try {
      const chats = await new Promise<Chat[]>((resolve, reject) => {
        fetchChats(userId, (chats: Chat[]) => {
          resolve(chats);
        });
      });
      const existingChat = chats.find(chat =>
        chat?.participants?.includes(contactId),
      );
      let chatId = existingChat?.id;

      if (!chatId) {
        chatId = await createNewChat([userId, contactId]);
      }

      dispatch(fetchUserChats(userId));
      return chatId;
    } catch (error) {
      dispatch(
        setError(
          error instanceof Error ? error.message : 'Failed to start chat',
        ),
      );
      throw error;
    }
  };

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChats(state, action: PayloadAction<Record<string, Chat>>) {
      const chats = action.payload;
      state.chats = Object.entries(chats).reduce(
        (acc: Record<string, Chat>, [chatId, chat]) => {
          acc[chatId] = {
            ...chat,
            lastActive: chat.lastActive
              ? new Date(chat.lastActive).toISOString()
              : null,
          };
          return acc;
        },
        {},
      );
    },
    setMessages(
      state,
      action: PayloadAction<{chatId: string; messages: Message[]}>,
    ) {
      state.messages[action.payload?.chatId] = action.payload?.messages?.map(
        message => ({
          ...message,
          timestamp: message.timestamp ? message.timestamp : null,
        }),
      );
    },
    addMessage(
      state,
      action: PayloadAction<{chatId: string; message: Message}>,
    ) {
      const {chatId, message} = action.payload;
      state.messages[chatId] = [
        ...state.messages[chatId],
        {
          ...message,
          timestamp: message.timestamp
            ? ((message.timestamp instanceof Timestamp
                ? message.timestamp.toDate().toISOString()
                : message.timestamp) as WritableDraft<Timestamp>)
            : null,
        },
      ];
    },
    deleteChatFromStore(state, action: PayloadAction<string>) {
      const chatId = action.payload;
      delete state?.chats[chatId];
      delete state?.messages[chatId];
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  setChats,
  setMessages,
  addMessage,
  setError,
  deleteChatFromStore,
} = chatSlice.actions;
export default chatSlice.reducer;
