import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Створення екземпляра axios для авторизації
export const authAPI = axios.create({
  baseURL: 'https://aqua-track-app.onrender.com', // Вкажіть правильний URL вашого серверу
  // baseURL: 'http://localhost:3000', // Локальний URL серверу, якщо потрібно
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Функції для додавання та очищення заголовку авторизації
export const setAuthHeader = token => {
  console.log('setAuthHeader', token);
  authAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  authAPI.defaults.headers.common.Authorization = '';
};

// Utility function for creating async actions
const createAsyncAction = (type, url, method = 'get', data = null) => {
  return createAsyncThunk(type, async (params, thunkAPI) => {
    const { auth } = thunkAPI.getState();
    const token = auth?.token;
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
    try {
      const response = await axios({ method, url, data: data || params });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  });
};

// Example usage of the utility function
export const signup = createAsyncAction(
  'auth/signup',
  '/auth/register',
  'post'
);
export const signin = createAsyncAction('auth/signin', '/auth/login', 'post');
export const logout = createAsyncAction('auth/logout', '/auth/logout', 'post');
export const refreshUser = createAsyncAction(
  'auth/refreshUser',
  '/auth/refresh',
  'post'
);
export const getUserData = createAsyncAction(
  'auth/getUserData',
  '/user/currentUser'
);
export const sendVerificationEmail = createAsyncAction(
  'auth/sendVerificationEmail',
  '/auth/verifycate',
  'post'
);
export const verifyEmail = createAsyncAction(
  'auth/verifyEmail',
  '/auth/verifycate'
);
