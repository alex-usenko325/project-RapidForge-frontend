// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { authAPI } from '../auth/operations';
// import dayjs from 'dayjs';

// export const fetchWaterPer = createAsyncThunk(
//   'fetchWaterPer',
//   async (date, thunkApi) => {
//     try {
//       const formattedDate = dayjs(date).format('YYYY-MM-DD');
//       const { data } = await authAPI.get(`/water/month/${formattedDate}`);

//       return data.data.waterMonthByDay;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );
