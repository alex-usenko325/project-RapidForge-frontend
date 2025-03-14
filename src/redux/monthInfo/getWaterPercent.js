import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const authApi = axios.create({
  // baseURL: 'https://aqua-track-app.onrender.com',
  baseURL: 'http://localhost:3000',
});

export const getMonthWaterInfo = createAsyncThunk(
  'water/getMonthWaterInfo',
  async ({ year, month }, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const { data } = await authApi.get(`/water/month`, {
        params: { year, month },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('😊Fetched month water data:', data);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Fetch error');
    }
  }
);
