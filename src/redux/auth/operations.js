import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const authAPI = axios.create({
  baseURL: 'https://aqua-track-app.onrender.com', // Вкажіть правильний порт вашого серверу
  // baseURL: 'http://localhost:3000', // Локальний порт вашого серверу
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
        await store.dispatch(refreshUser());
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

// Додавання та очищення заголовку авторизації
const setAuthHeader = token => {
  console.log('setAuthHeader', token);
  authAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  authAPI.defaults.headers.common.Authorization = '';
};

// Реєстрація
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

export const sendVerificationEmail = createAsyncThunk(
  'auth/sendVerificationEmail',
  async (email, thunkAPI) => {
    try {
      console.log('Sending verification email to:', email); // Лог email перед відправкою

      const response = await authAPI.post('/auth/verifycate', { email });

      console.log('Verification email sent successfully:', response.data); // Лог відповіді після успішного запиту

      return response.data;
    } catch (error) {
      console.error('Error sending verification email:', error.message); // Лог помилки, якщо вона сталася

      return thunkAPI.rejectWithValue(error.message); // Повертання помилки в Redux
    }
  }
);

// Додавання операції verifyEmail для верифікації електронної пошти
export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (token, thunkAPI) => {
    console.log('Received token in verifyEmail:', token); // Логування отриманого токена
    try {
      const response = await authAPI.get(`/auth/verifycate?token=${token}`);
      console.log('Verification response:', response.data); // Лог відповіді сервера
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

// Логаут
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
// export const getUserData = createAsyncThunk(
//   'auth/getUserData',
//   async (_, thunkAPI) => {
//     try {
//       const response = await authAPI.get('/user/currentUser');
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

export const getUserData = createAsyncThunk(
  'auth/getUserData',
  async (_, thunkAPI) => {
    try {
      // Логуємо запит перед виконанням
      console.log('Sending request to get current user data...');
      const savedToken = thunkAPI.getState().auth.token;
      if (!savedToken) {
        return thunkAPI.rejectWithValue('Token is not exist');
      }
      setAuthHeader(savedToken);
      const response = await authAPI.get('/user/currentUser');

      // Логуємо отриману відповідь
      console.log('User data received:', response.data.data);

      return response.data.data;
    } catch (error) {
      // Логуємо помилку, якщо вона сталася
      console.error(
        'Error fetching user data:',
        error.response ? error.response.data : error.message
      );
      return thunkAPI.rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
  // { condition({ getState }) { } }
);

export const patchUserData = createAsyncThunk(
  'user/patchUserData',
  async ({ userData, userId }, thunkAPI) => {
    try {
      const response = await authAPI.patch(`user/update/${userId}`, userData);

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const patchUserAvatar = createAsyncThunk(
  'user/patchUserAvatar',
  async ({ formData, userId }, thunkAPI) => {
    try {
      const response = await authAPI.patch(`/user/avatar/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
