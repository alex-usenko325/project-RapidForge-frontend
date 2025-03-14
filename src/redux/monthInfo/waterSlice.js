import { createSlice } from '@reduxjs/toolkit';
import { getMonthWaterInfo } from './getWaterPercent';

const initialState = {
  monthData: [],
  isLoading: false,
  error: null,
};

const waterSlice = createSlice({
  name: 'water',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getMonthWaterInfo.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMonthWaterInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.monthData = action.payload;
      })
      .addCase(getMonthWaterInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default waterSlice.reducer;
