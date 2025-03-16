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

let store;

export const injectStore = _store => {
  store = _store;
};

authAPI.interceptors.response.use(
  response => response,
  async error => {
    console.log('interceptor error response', error);
    const originalRequest = error.config;
    console.log('originalRequest._retry: ', originalRequest._retry);

    if (
      // error.response.status === 401 &&
      error.response.data.message === 'Access token expired' &&
      !originalRequest._retry
    ) {
      console.log('error.response.data.message', error.response.data.message);
      originalRequest._retry = true;
      try {
        await store.dispatch(refreshAccessToken());

        const newToken = store.getState().auth.token;
        setAuthHeader(newToken, 'interceptors');
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        console.log('interseptors: newToken', newToken);

        return authAPI(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

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
      console.log('Response from API:', response); // Лог відповіді після успішного запиту
      return response.data.data;
    } catch (err) {
      console.error('Error caught in signup:', err); // Лог помилки

      if (err) {
        console.log('Error response:', err.response); // Лог помилки в response
        if (err.response && err.response.status === 409) {
          console.log('Email is already in use'); // Лог повідомлення для помилки 409
          return thunkAPI.rejectWithValue('Email is already in use');
        }
      }

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
      console.log('🔥 Відповідь від бекенду:', response.data); // Додай цей лог
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
export const refreshAccessToken = createAsyncThunk(
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
