import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { authAPI } from '../auth/operations';
import dayjs from 'dayjs';

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
      const response = await waterAPI.get('water/today');
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
      const response = await waterAPI.post('water/', record);
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
      const response = await waterAPI.patch(`water/${id}`, updatedData);
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
      await waterAPI.delete(`water/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Error deleting record'
      );
    }
  }
);

// export const fetchWaterItem = createAsyncThunk(
//   'fetchWaterItem',
//   async (date, thunkApi) => {
//     try {
//       const { data } = await waterAPI.get(`/water/day/${date}`);
//       return data.data.waterDayByHour;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

// export const addWaterItem = createAsyncThunk(
//   'addWaterItem',
//   async (item, thunkApi) => {
//     try {
//       const { data } = await waterAPI.post('/water', item);
//       return data.data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

// export const updateWaterItem = createAsyncThunk(
//   'updateWaterItem',
//   async (item, thunkApi) => {
//     try {
//       const { _id, ...bodyWithoutId } = item;
//       const { data } = await waterAPI.patch(`water/${_id}`, bodyWithoutId);
//       return data.data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

// export const deleteWaterItem = createAsyncThunk(
//   'deleteWaterItem',
//   async (_id, thunkApi) => {
//     try {
//       if (!_id || typeof _id !== 'string') {
//         throw new Error('Invalid ID: ID is missing or not a valid string.');
//       }
//       const { data } = await waterAPI.delete(`/water/${_id}`);
//       console.log('Delete response:', data);
//       return _id;
//     } catch (error) {
//       console.error(
//         'Error deleting water item:',
//         error.response?.data || error.message
//       );
//       return thunkApi.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

export const fetchWaterPer = createAsyncThunk(
  'fetchWaterPer',
  async (date, thunkApi) => {
    try {
      const formattedDate = dayjs(date).startOf('month').format('YYYY-MM-DD');

      const { data } = await authAPI.get(`/water/month/${formattedDate}`);

      return data.data.waterMonthByDay;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchWaterPercentData = createAsyncThunk(
  'waterPer/fetchWaterPercentData',
  async (date, thunkApi) => {
    try {
      const data = await fetchWaterPer(date);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
