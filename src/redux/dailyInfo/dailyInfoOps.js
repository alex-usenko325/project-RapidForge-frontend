// import { createAsyncThunk } from '@reduxjs/toolkit';
// // import { authAPI } from '../auth/operations';
// import { authAPI } from '../auth/operations.js';

// export const fetchWaterItem = createAsyncThunk(
//   'fetchWaterItem',
//   async (date, thunkApi) => {
//     try {
//       const { data } = await authAPI.get(`/water/day/${date}`);
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
//       const { data } = await authAPI.post('/water', item);
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
//       const { data } = await authAPI.patch(`water/${_id}`, bodyWithoutId);
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
//       const { data } = await authAPI.delete(`/water/${_id}`);
//       console.log('Delete response:', data); // Перевіряємо відповідь сервера
//       return _id; // Повертаємо ID видаленого елементу
//     } catch (error) {
//       console.error(
//         'Error deleting water item:',
//         error.response?.data || error.message
//       );
//       return thunkApi.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );
