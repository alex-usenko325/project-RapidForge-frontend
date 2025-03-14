import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const authApi = axios.create({
  // baseURL: 'https://aqua-track-app.onrender.com',
  baseURL: 'http://localhost:3000',
});

export const getClientsNumber = createAsyncThunk(
  'user/getClientsNumber',
  async (_, thunkAPI) => {
    try {
      const response = await authApi.get('/user/usersCount');
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
