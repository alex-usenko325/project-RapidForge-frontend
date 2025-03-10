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
        // Очищаємо поточний масив і додаємо нові дані, зберігаючи референцію
        state.records.length = 0; // Очищаємо існуючий масив
        action.payload.data.forEach(record => state.records.push(record)); // Додаємо елементи
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
        state.records.push(action.payload.data); // Додаємо до існуючого масиву
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
        const index = state.records.findIndex(
          record => record._id === action.payload.data._id
        );
        if (index !== -1) {
          state.records[index] = action.payload.data;
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
        // Фільтруємо на місці, щоб уникнути нової референції
        for (let i = state.records.length - 1; i >= 0; i--) {
          if (state.records[i]._id === action.payload) {
            state.records.splice(i, 1);
          }
        }
      })
      .addCase(deleteWaterRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const waterReducer = waterSlice.reducer;
