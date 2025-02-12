import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from './slices/userSlice';
import chatReducer from './slices/chatSlice';
import contactsReducer from './slices/contactSlice';
import usersReducer from './slices/users.slice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage, // 🔥 Store data in AsyncStorage
};
const persistedUserReducer = persistReducer(persistConfig, userReducer);

// const rootReducer = combineReducers({
//   user: userReducer,
//   chat: chatReducer,
//   contacts: contactsReducer,
//   users: usersReducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    user: userReducer, // 🔥 Persist user data
    chat: chatReducer,
    contacts: contactsReducer,
    users: usersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// export const persistor = persistStore(store);
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
