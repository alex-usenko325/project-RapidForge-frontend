import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { authAPI, refreshAccessToken } from '../auth/operations';

export const userAPI = axios.create({
  baseURL: 'https://aqua-track-app.onrender.com',
  // baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const setAuthHeader = token => {
  console.log('setAuthHeader', token);
  userAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
};

let store;

export const injectUserStore = _store => {
  store = _store;
};

userAPI.interceptors.response.use(
  response => response,
  async error => {
    console.log('interceptor error response', error);
    const originalRequest = error.config;
    console.log(
      'interceptor: originalRequest._retry: ',
      originalRequest._retry
    );

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
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const getClientsNumber = createAsyncThunk(
  'user/getClientsNumber',
  async (_, thunkAPI) => {
    try {
      const response = await userAPI.get('/user/usersCount');
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
      const savedToken = thunkAPI.getState().auth.token;
      if (!savedToken) {
        return thunkAPI.rejectWithValue('Token is not exist');
      }
      setAuthHeader(savedToken);
      const response = await userAPI.get('/user/currentUser');
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
      const response = await userAPI.patch(`user/update/${userId}`, userData);

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
      const response = await userAPI.patch(`/user/avatar/${userId}`, formData, {
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
