import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Створення екземпляра axios для авторизації
export const authAPI = axios.create({
  // baseURL: 'https://aqua-track-app.onrender.com', // Вкажіть правильний URL вашого серверу
  baseURL: 'http://localhost:4000', // Локальний URL серверу, якщо потрібно
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
    const originalRequest = error.config;
    if (
      error.response.data.message === 'Access token expired' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        await store.dispatch(refreshAccessToken());
        const newToken = store.getState().auth.token;
        setAuthHeader(newToken, 'interceptors');
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return authAPI(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// Функції для додавання та очищення заголовку авторизації
export const setAuthHeader = token => {
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
      if (err) {
        if (err.response && err.response.status === 409) {
          return thunkAPI.rejectWithValue(err.response.data);
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
      const response = await authAPI.post('/auth/verifycate', { email });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Верифікація email через токен
export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (token, thunkAPI) => {
    try {
      const response = await authAPI.get(`/auth/signin?token=${token}`);
      return response.data;
    } catch (error) {
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
      return thunkAPI.rejectWithValue(err.response.data);
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

export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (code, thunkAPI) => {
    try {
      // Відправка коду авторизації до бекенду
      const response = await authAPI.post('/confirm-oauth', { code });

      // Перевірка статусу
      if (response.data.status === 200) {
        // Повернення даних безпосередньо з response.data.data
        return response.data.data;
      } else {
        return thunkAPI.rejectWithValue('Error during Google OAuth');
      }
    } catch (error) {
      // Обробка помилки 401
      if (error.response && error.response.status === 401) {
        return thunkAPI.rejectWithValue(
          'Unauthorized access. Please check your credentials.'
        );
      }
      // Обробка інших помилок
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
