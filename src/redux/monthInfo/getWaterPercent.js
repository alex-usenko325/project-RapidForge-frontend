import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://aqua-track-app.onrender.com';

export const getMonthWaterInfo = createAsyncThunk(
  'water/getMonthWaterInfo',
  async ({ year, month }, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      const { data } = await axios.get(`/water/month`, {
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
