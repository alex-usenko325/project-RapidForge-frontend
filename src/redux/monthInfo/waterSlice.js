// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { fetchWaterPer } from "./getWaterPercent.js";

// export const fetchWaterPercentData = createAsyncThunk(
//   "waterPer/fetchWaterPercentData",
//   async (date, thunkApi) => {
//     try {
//       const data = await fetchWaterPer(date);

//       return data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

// const initialState = {
//   waterData: [],
//   isLoading: false,
//   isError: false,
// };

// const waterPerSlice = createSlice({
//   name: "waterPer",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchWaterPer.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(fetchWaterPer.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.waterData = action.payload;
//       })
//       .addCase(fetchWaterPer.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = action.payload;
//       });
//   },
// });

// export const selectWaterData = (state) => state.waterPer.waterData;
// export const selectIsLoading = (state) => state.waterPer.isLoading;
// export const selectIsError = (state) => state.waterPer.isError;

// export const waterPerReducer = waterPerSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWaterPer } from './getWaterPercent.js';

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

const initialState = {
  waterData: [],
  isLoading: false,
  isError: false,
};

const waterPerSlice = createSlice({
  name: 'waterPer',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWaterPer.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchWaterPer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.waterData = action.payload;
      })
      .addCase(fetchWaterPer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      });
  },
});

export const selectWaterData = state => state.waterPer.waterData;
export const selectIsLoading = state => state.waterPer.isLoading;
export const selectIsError = state => state.waterPer.isError;

export const waterPerReducer = waterPerSlice.reducer;
