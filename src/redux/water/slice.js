import { createSlice } from '@reduxjs/toolkit';
import {
  getWaterRecords,
  addWaterRecord,
  updateWaterRecord,
  deleteWaterRecord,
} from './operations';

const initialState = {
  records: [],
  isLoading: false,
  error: null,
};

const waterSlice = createSlice({
  name: 'water',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getWaterRecords.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getWaterRecords.fulfilled, (state, action) => {
        state.isLoading = false;
        state.records = action.payload; // Оновлюємо масив
      })
      .addCase(getWaterRecords.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addWaterRecord.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addWaterRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.records.push(action.payload);
      })
      .addCase(addWaterRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateWaterRecord.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateWaterRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedRecord = action.payload;
        const index = state.records.findIndex(
          record => record._id === updatedRecord._id
        );
        if (index !== -1) {
          state.records[index] = updatedRecord;
        }
      })
      .addCase(updateWaterRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteWaterRecord.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteWaterRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        state.records = state.records.filter(
          record => record._id !== action.payload
        );
      })
      .addCase(deleteWaterRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const waterReducer = waterSlice.reducer;
