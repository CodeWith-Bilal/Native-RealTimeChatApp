import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import userReducer from './slices/userSlice';
import chatReducer from './slices/chatSlice';
import contactsReducer from './slices/contactSlice';
import usersReducer from './slices/users.slice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

// Redux Persist Config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'], // Sirf 'user' slice ko persist karna hai
};

// User Reducer ko Persisted Reducer Banayen
const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer, // Ab ye persist hoga
    chat: chatReducer,
    contacts: contactsReducer,
    users: usersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Persistor Export Karein
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
