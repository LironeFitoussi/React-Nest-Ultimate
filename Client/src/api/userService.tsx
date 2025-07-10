import axiosInstance from './axiosInstance';
import type { User, CreateUser } from '@/types';
import type { ApiResponseDto } from '@/types/dto';
import { User as Auth0User } from '@auth0/auth0-react';
import { AxiosError } from 'axios';

const endpoint = '/api/v1/users';

// --- CRUD API functions ---
export const getAllUsers = async (): Promise<User[]> => {
  const { data } = await axiosInstance.get<User[]>(endpoint);
  return data;
};

// Get user by email
export const getUserByEmail = async (email: string, auth0UserData?: Auth0User): Promise<ApiResponseDto<User>> => {
  try {
    const response = await axiosInstance.get<ApiResponseDto<User>>(`${endpoint}/email/${email}`);
    const { data } = response;
    
    // Handle empty response as "not found"
    if (!data || !data.success || !data.data) {
      if (auth0UserData) {
        // Create new user object from Auth0 data
        const newUser: CreateUser = {
          email: auth0UserData.email || '',
          firstName: auth0UserData.given_name || auth0UserData.name?.split(' ')[0] || '',
          lastName: auth0UserData.family_name || auth0UserData.name?.split(' ').slice(1).join(' ') || '',
          phone: '',
          role: 'user', // Default role
        };

        // Create the user
        const createdUser = await createUser(newUser);
        return {
          data: createdUser,
          message: 'User created successfully',
          success: true
        };
      }
      
      throw new Error('User not found and no Auth0 data provided for creation');
    }

    return data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404 && auth0UserData) {
      // Create new user object from Auth0 data
      const newUser: CreateUser = {
        email: auth0UserData.email || '',
        firstName: auth0UserData.given_name || auth0UserData.name?.split(' ')[0] || '',
        lastName: auth0UserData.family_name || auth0UserData.name?.split(' ').slice(1).join(' ') || '',
        phone: '',
        role: 'user', // Default role
      };

      // Create the user
      const createdUser = await createUser(newUser);
      return {
        data: createdUser,
        message: 'User created successfully',
        success: true
      };
    }
    
    throw error;
  }
};

// Get user by regex
export const getUserRegex = async (regex: string): Promise<User[]> => {
  const { data } = await axiosInstance.get<User[]>(`${endpoint}/regex/${regex}`);
  return data;
};

// Create user
export const createUser = async (user: CreateUser): Promise<User> => {
  const { data } = await axiosInstance.post<User>(endpoint, user);
  return data;
};

// Update user
export const updateUser = async (user: User): Promise<User> => {
  const { data } = await axiosInstance.put<User>(`${endpoint}/${user._id}`, user);
  return data;
};



