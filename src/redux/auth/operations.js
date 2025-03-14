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
export const refresh = createAsyncThunk(
  'auth/refreshUser',
  async (_, thunkAPI) => {
    const savedToken = thunkAPI.getState().auth.token;

    // Якщо токен відсутній в Redux
    if (!savedToken) {
      try {
        console.log('No token found in Redux, requesting new token...');

        const response = await authAPI.post('/auth/refresh');
        const newToken = response.data.data.accessToken;

        console.log('New Token from refresh: ', newToken); // Лог нового токену

        // Встановлюємо новий токен у заголовок
        setAuthHeader(newToken);
        console.log('New token set in header');

        // Викликаємо action для отримання даних користувача
        await thunkAPI.dispatch(getUserData());
        console.log('User data fetched successfully');

        return response.data.data;
      } catch (error) {
        console.error('Error during token refresh: ', error);
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
      }
    }

    // Якщо токен є в Redux, встановлюємо його в заголовок
    console.log('Using saved token from Redux: ', savedToken);
    setAuthHeader(savedToken);
    console.log('Token set in header from Redux');

    // Отримуємо дані користувача після встановлення токену
    await thunkAPI.dispatch(getUserData());
    console.log('User data fetched successfully after token refresh');

    return { token: savedToken };
  }
);

// Отримання даних користувача
export const getUserData = createAsyncThunk(
  'auth/getUserData',
  async (_, thunkAPI) => {
    try {
      const response = await authAPI.get('/user/currentUser');
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
