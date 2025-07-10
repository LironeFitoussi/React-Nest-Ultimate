import type { Test } from '@/types';
import type { 
  CreateTestRequestDto, 
  UpdateTestRequestDto,
  ApiResponseDto,
  PaginatedResponseDto,
  ErrorResponseDto
} from '@/types/dto';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

// Auth0 token getter - this will be set by the app
let getAccessToken: (() => Promise<string>) | null = null;

export const setTokenGetter = (tokenGetter: () => Promise<string>) => {
  getAccessToken = tokenGetter;
};

// Generic API call function with error handling
async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  let token = '';
  
  // Get token from Auth0
  if (getAccessToken) {
    try {
      token = await getAccessToken();
    } catch (error) {
      console.error('Failed to get access token:', error);
      throw new Error('Authentication required');
    }
  }
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'An error occurred' })) as ErrorResponseDto;
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

// Test API
export const testApi = {
  // Get all tests
  getAll: () => 
    apiCall<PaginatedResponseDto<Test>>('/tests'),

  // Get test by ID
  getById: (id: string) => 
    apiCall<ApiResponseDto<Test>>(`/tests/${id}`),

  // Create new test
  create: (data: CreateTestRequestDto) =>
    apiCall<ApiResponseDto<Test>>('/tests', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Update test  
  update: (id: string, data: UpdateTestRequestDto) =>
    apiCall<ApiResponseDto<Test>>(`/tests/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Delete test
  delete: (id: string) =>
    apiCall<ApiResponseDto<{ message: string }>>(`/tests/${id}`, {
      method: 'DELETE',
    }),
};

// Export all APIs
export default {
  test: testApi,
}; 