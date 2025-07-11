import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearUser } from '@/store/slices/userSlice';
import type { User, CreateUser } from '@/types';

// React Query
import { useQuery } from '@tanstack/react-query';

// API
import { getUserRegex, createUser } from '@/api/userService';

export function useUser() {
  const dispatch = useAppDispatch();
  const { currentUser, isLoading, error } = useAppSelector((state) => state.user);

  const logout = () => {
    dispatch(clearUser());
  };

  return {
    user: currentUser,
    isLoading,
    error,
    logout,
  };
}

export const useUserRegex = (regex: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users', regex],
    queryFn: () => getUserRegex(regex),
    enabled: !!regex && regex.trim() !== "",
  });

  return {
    data: (data as User[]) || [],
    isLoading,
    error,
  };
};

export const useUserCreate = (user: CreateUser) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: () => createUser(user),
  });
 
  return {
    data,
    isLoading,
    error,
  };
}

