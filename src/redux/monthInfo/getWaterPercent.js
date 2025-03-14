import { createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../auth/operations';

export const fetchWaterPer = createAsyncThunk(
  'fetchWaterPer',
  async (date, thunkApi) => {
    try {
      const { data } = await authAPI.get(`/water/month/${date}`);

      return data.data.waterMonthByDay;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
