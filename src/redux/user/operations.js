import { createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../auth/operations';

export const setAuthHeader = token => {
  authAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const getClientsNumber = createAsyncThunk(
  'user/getClientsNumber',
  async (_, thunkAPI) => {
    try {
      const response = await authAPI.get('/user/usersCount');
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Отримання даних користувача
export const getUserData = createAsyncThunk(
  'user/getUserData',
  async (_, thunkAPI) => {
    try {
      const savedToken = thunkAPI.getState().auth.token;
      if (!savedToken) {
        return thunkAPI.rejectWithValue('Token is not exist');
      }
      setAuthHeader(savedToken);
      const response = await authAPI.get('/user/currentUser');
      return response.data.data;
    } catch (error) {
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
