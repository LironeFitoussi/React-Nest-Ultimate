import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import * as userService from '@/api/userService';
import { AxiosError } from 'axios';
import { User as Auth0User } from '@auth0/auth0-react';
import type { ApiResponseDto } from '@/types/dto';
import type { User } from '@/types';

// Extend the User interface from userService
interface UserState {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  role: string;
  isLoading: boolean;
  error: string | null;
  // Add any other user properties you need
}

const initialState: UserState = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  role: '',
  isLoading: false,
  error: null,
};

interface FetchUserByEmailPayload {
  email: string;
  auth0User: Auth0User;
}

// Async thunk for fetching user data
export const fetchUserByEmail = createAsyncThunk(
  'user/fetchByEmail',
  async (userData: FetchUserByEmailPayload, { rejectWithValue }) => {
    console.log('Starting fetchUserByEmail:', userData.email);
    try {
      const response = await userService.getUserByEmail(userData.email, userData.auth0User);
      console.log('User data fetched:', response);
      return response as unknown as ApiResponseDto<User>;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Error in fetchUserByEmail:', error.response?.data);
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch user data');
      }
      return rejectWithValue('Failed to fetch user data');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      console.log('Setting user state:', action.payload);
      return { ...state, ...action.payload };
    },
    resetUser: () => {
      console.log('Resetting user state');
      return initialState;
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
        const userData = action.payload.data; // Extract the data from the response
        // Map all properties from the response, handling _id -> id conversion
        state.id = userData._id || ''; // Map _id to id
        state.email = userData.email;
        state.firstName = userData.firstName;
        state.lastName = userData.lastName;
        state.phone = userData.phone;
        state.address = userData.address || '';
        state.city = userData.city || '';
        state.state = userData.state || '';
        state.zip = userData.zip || '';
        state.role = userData.role;
      })
      .addCase(fetchUserByEmail.rejected, (state, action) => {
        console.error('fetchUserByEmail rejected:', action.error);
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch user data';
      });
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer; 