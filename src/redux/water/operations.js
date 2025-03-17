import { createAsyncThunk } from '@reduxjs/toolkit';

import { authAPI } from '../auth/operations';

const setAuthHeader = token => {
  if (token) {
    authAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete authAPI.defaults.headers.common.Authorization;
  }
};

export const getWaterByMonth = createAsyncThunk(
  'water/getWaterByMonth',
  async ({ month, year }, thunkApi) => {
    try {
      const {
        data: { data },
      } = await authAPI.get(`water/month?year=${year}&month=${month}`);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

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
      const response = await authAPI.get('water/today');
      return response.data;
    } catch (error) {
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
      const response = await authAPI.post('water/', record);
      return response.data.data;
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
      const response = await authAPI.patch(`water/${id}`, updatedData);
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
      await authAPI.delete(`water/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Error deleting record'
      );
    }
  }
);
