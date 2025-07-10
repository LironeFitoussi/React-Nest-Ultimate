export type User = {
  _id: string;
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

export type CreateUser = Omit<User, '_id'>;

// Test Types
export type Test = {
  _id: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateTest = Omit<Test, '_id' | 'createdAt' | 'updatedAt'>;
