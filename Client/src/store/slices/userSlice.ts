import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserByEmail as getUserByEmailService } from '@/api/userService';
import type { User } from '@/types';
import type { User as Auth0User } from '@auth0/auth0-react';

interface UserState {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const fetchUserByEmail = createAsyncThunk(
  'user/fetchByEmail',
  async ({ email, auth0User }: { email: string; auth0User: Auth0User }) => {
    const response = await getUserByEmailService(email, auth0User);
    return response;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.currentUser = null;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserByEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserByEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload.data;
        state.error = null;
      })
      .addCase(fetchUserByEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch user';
      });
  },
});

export const { clearUser, setLoading } = userSlice.actions;
export default userSlice.reducer; 