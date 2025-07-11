import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User as Auth0User } from '@auth0/auth0-react';
import * as userService from '../../api/userService';
import type { User } from '@/types';

// Extend the User interface from userService
interface UserState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  user: null,
  status: 'idle',
  error: null,
};

interface FetchUserByEmailPayload {
  email: string;
  auth0User?: Auth0User; // Make it optional since we don't always need it
}

// Async thunk for fetching user data
export const fetchUserByEmail = createAsyncThunk(
  'user/fetchByEmail',
  async ({ email }: FetchUserByEmailPayload, { rejectWithValue }) => {
    try {
      const response = await userService.getUserByEmail(email);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserByEmail.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserByEmail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUserByEmail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer; 