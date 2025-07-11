// src/utils/axiosInstance.ts
import axios from 'axios';
import { getAccessToken } from '@/services/api';

// Create axios instance with base URL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

// Add request interceptor for auth token
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('❌ Auth token error:', error);
    }
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error.message);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Only log non-404 errors (404s are expected and handled in services)
      if (error.response.status !== 404) {
        console.error('❌ API Error:', {
          status: error.response.status,
          url: error.config.url,
          message: error.response.data?.message || error.message
        });
      }
    } else if (error.request) {
      console.error('❌ Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
