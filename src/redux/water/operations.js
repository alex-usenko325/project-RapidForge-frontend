import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const waterAPI = axios.create({
  baseURL: 'https://aqua-track-app.onrender.com', // Вкажіть правильний порт вашого серверу
});

const setAuthHeader = token => {
  if (token) {
    waterAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete waterAPI.defaults.headers.common.Authorization;
  }
};

export const getWaterRecords = createAsyncThunk(
  'water/getWaterRecords',
  async (_, thunkAPI) => {
    const { auth } = thunkAPI.getState();
    const token = auth?.token;

    if (!token) {
      return thunkAPI.rejectWithValue('No authentication token provided');
    }

    setAuthHeader(token);
    try {
      const response = await waterAPI.get('/today');
      console.log('Response from /water/today:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching records:', error);
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Error fetching records'
      );
    }
  }
);

export const addWaterRecord = createAsyncThunk(
  'water/addWaterRecord',
  async (record, thunkAPI) => {
    const { auth } = thunkAPI.getState();
    const token = auth.token;
    if (token) setAuthHeader(token);
    try {
      const response = await waterAPI.post('/', record);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Error adding record'
      );
    }
  }
);

export const updateWaterRecord = createAsyncThunk(
  'water/updateWaterRecord',
  async ({ id, updatedData }, thunkAPI) => {
    const { auth } = thunkAPI.getState();
    const token = auth.token;
    if (token) setAuthHeader(token);
    try {
      const response = await waterAPI.patch(`/${id}`, updatedData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Error updating record'
      );
    }
  }
);

export const deleteWaterRecord = createAsyncThunk(
  'water/deleteWaterRecord',
  async (id, thunkAPI) => {
    const { auth } = thunkAPI.getState();
    const token = auth.token;
    if (token) setAuthHeader(token);
    try {
      await waterAPI.delete(`/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Error deleting record'
      );
    }
  }
);
