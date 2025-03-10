import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://aqua-track-app.onrender.com';

export const getClientsNumber = createAsyncThunk(
  'user/getClientsNumber',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/user/usersCount');
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
