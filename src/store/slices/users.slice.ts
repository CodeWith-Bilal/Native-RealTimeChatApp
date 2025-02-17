import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {fetchUsers} from '../../hooks/useUser';
import {User} from '../../types/firestoreService';

interface UsersState {
  users: User[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: null,
};

export const fetchUsersThunk = createAsyncThunk<User[], string | undefined>(
  'users/fetchAll',
  async (userId, {rejectWithValue}) => {
    try {
      const users = await fetchUsers(userId);
      return users;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || 'Failed to fetch users.');
      }
      return rejectWithValue('Failed to fetch users.');
    }
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAllUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsersThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchUsersThunk.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.isLoading = false;
          state.users = action.payload;
        },
      )
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default usersSlice.reducer;
