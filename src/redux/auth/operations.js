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

// Реєстрація користувача
export const signup = createAsyncThunk(
  'auth/signup',
  async (body, thunkAPI) => {
    try {
      const response = await authAPI.post('/auth/register', body);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Відправлення верифікаційного email
export const sendVerificationEmail = createAsyncThunk(
  'auth/sendVerificationEmail',
  async (email, thunkAPI) => {
    try {
      console.log('Sending verification email to:', email);
      const response = await authAPI.post('/auth/verifycate', { email });
      console.log('Verification email sent successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error sending verification email:', error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Верифікація email через токен
export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (token, thunkAPI) => {
    console.log('Received token in verifyEmail:', token);
    try {
      const response = await authAPI.get(`/auth/verifycate?token=${token}`);
      console.log('Verification response:', response.data);
      return response.data;
    } catch (error) {
      console.error(
        'Verification request failed:',
        error.response?.data || error.message
      );
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Verification failed'
      );
    }
  }
);

// Вхід користувача (логін)
export const signin = createAsyncThunk(
  'auth/signin',
  async (body, thunkAPI) => {
    try {
      const response = await authAPI.post('/auth/login', body);
      setAuthHeader(response.data.data.accessToken);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Логаут користувача
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await authAPI.post('/auth/logout');
    clearAuthHeader();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

// Оновлення токена користувача
export const refreshUser = createAsyncThunk(
  'auth/refreshUser',
  async (_, thunkAPI) => {
    const savedToken = thunkAPI.getState().auth.token;
    if (!savedToken) {
      return thunkAPI.rejectWithValue('Token is not exist');
    }
    try {
      setAuthHeader(savedToken);
      const response = await authAPI.post('/auth/refresh');
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Отримання даних користувача
export const getUserData = createAsyncThunk(
  'auth/getUserData',
  async (_, thunkAPI) => {
    try {
      console.log('Sending request to get current user data...');
      const savedToken = thunkAPI.getState().auth.token;
      if (!savedToken) {
        return thunkAPI.rejectWithValue('Token is not exist');
      }
      setAuthHeader(savedToken);
      const response = await authAPI.get('/user/currentUser');
      console.log('User data received:', response.data.data);
      return response.data.data;
    } catch (error) {
      console.error(
        'Error fetching user data:',
        error.response ? error.response.data : error.message
      );
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
