import type { User, Test } from './index';

// User DTOs
export type UserResponseDto = {
  data: User;
  message: string;
};

export type UsersResponseDto = {
  data: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};

export type CreateUserRequestDto = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  role: string;
};

export type UpdateUserRequestDto = Partial<CreateUserRequestDto>;

// Test DTOs
export type TestResponseDto = {
  data: Test;
  message: string;
};

export type TestsResponseDto = {
  data: Test[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};

export type CreateTestRequestDto = {
  title: string;
  description?: string;
};

export type UpdateTestRequestDto = Partial<CreateTestRequestDto>;

// Generic Response DTO
export type ApiResponseDto<T> = {
  data: T;
  message: string;
  success: boolean;
};

// Generic Paginated Response DTO
export type PaginatedResponseDto<T> = {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  message: string;
  success: boolean;
};

// Error Response DTO
export type ErrorResponseDto = {
  message: string;
  error: string;
  statusCode: number;
  success: false;
}; 