import axiosInstance from './axiosInstance';
import type { Test, CreateTest } from '@/types';
import type { ApiResponseDto } from '@/types/dto';

const endpoint = '/tests';

// --- CRUD API functions ---
export const getAllTests = async (): Promise<Test[]> => {
  const { data } = await axiosInstance.get<ApiResponseDto<Test[]>>(endpoint);
  return data.data;
};

export const getTestById = async (id: string): Promise<Test> => {
  const { data } = await axiosInstance.get<ApiResponseDto<Test>>(`${endpoint}/${id}`);
  return data.data;
};

export const createTest = async (payload: CreateTest): Promise<Test> => {
  const { data } = await axiosInstance.post<ApiResponseDto<Test>>(endpoint, payload);
  return data.data;
};

export const updateTest = async ({ id, payload }: { id: string; payload: Partial<CreateTest> }): Promise<Test> => {
  const { data } = await axiosInstance.put<ApiResponseDto<Test>>(`${endpoint}/${id}`, payload);
  return data.data;
};

export const removeTest = async (id: string): Promise<void> => {
  await axiosInstance.delete(`${endpoint}/${id}`);
};

