import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../../types/firestoreService';
import {RootState} from '../store';
import { fetchContacts } from '../../hooks/useContacts';

interface ContactsState {
  contacts: User[];
  loading: boolean;
  error: string | null;
}

const initialState: ContactsState = {
  contacts: [],
  loading: false,
  error: null,
};

export const fetchContactsThunk = createAsyncThunk(
  'contacts/fetchContacts',
  async (userId: string, {dispatch, rejectWithValue}) => {
    try {
      return new Promise<void>((resolve, _reject) => {
        const unsubscribe = fetchContacts(userId, contacts => {
          dispatch(setContacts(contacts));
          resolve();
        });

        return () => {
          unsubscribe();
        };
      });
    } catch (error) {
      return rejectWithValue('Failed to filter contacts');
    }
  },
);

export const addContact = createAsyncThunk<
  User | undefined,
  string,
  {state: RootState}
>('contacts/addContact', async (uid, {getState, rejectWithValue}) => {
  const allUsers = getState().users.users;
  const userToAdd = allUsers.find(user => user.uid === uid);

  if (!userToAdd) {
    console.error('User not found in users slice:', uid);
    return rejectWithValue('User not found');
  }
  return userToAdd;
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContactsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setContacts: (state, action: PayloadAction<User[]>) => {
      state.contacts = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(addContact.fulfilled, (state, action) => {
      if (action.payload) {
        const isAlreadyContact = state.contacts.some(
          contact => contact.uid === action.payload?.uid,
        );

        if (!isAlreadyContact) {
          state.contacts = [...state.contacts, action.payload];
        } else {
          console.warn('User is already in contacts:', action.payload);
        }
      }
    });
    builder.addCase(fetchContactsThunk.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchContactsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const {setContactsLoading, setContacts} = contactsSlice.actions;

export default contactsSlice.reducer;