import { createAsyncThunk } from '@reduxjs/toolkit';
import { userAPI } from '../user/operations';

export const fetchWaterPer = createAsyncThunk(
  'fetchWaterPer',
  async (date, thunkApi) => {
    try {
      const { data } = await userAPI.get(`/water/month/${date}`);

      return data.data.waterMonthByDay;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
