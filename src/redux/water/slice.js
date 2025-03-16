import { createSlice } from '@reduxjs/toolkit';
import {
  getWaterRecords,
  addWaterRecord,
  updateWaterRecord,
  deleteWaterRecord,
  getWaterByMonth,
} from './operations';
import { logout } from '../auth/operations.js';

const initialState = {
  monthIntakes: [],
  records: [],
  isLoading: false,
  error: null,
  selectedDate: null,
};

const waterSlice = createSlice({
  name: 'water',
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getWaterByMonth.fulfilled, (state, { payload }) => {
        state.monthIntakes = payload;
        state.loading = false;
      })

      .addCase(getWaterByMonth.pending, state => {
        state.loading = true;
      })
      .addCase(getWaterByMonth.rejected, state => {
        state.loading = false;
      })
      .addCase(getWaterRecords.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getWaterRecords.fulfilled, (state, action) => {
        console.log('Water Records Fulfilled:', action.payload); // Лог для перевірки відповіді
        state.isLoading = false;
        state.records = action.payload.data; // Перевірте, чи дані є в 'data'
      })
      .addCase(getWaterRecords.rejected, (state, action) => {
        console.log('Error fetching water records:', action.payload); // Лог помилки, якщо є
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
      })
      .addCase(logout.fulfilled, () => initialState);
  },
});

export const { setSelectedDate } = waterSlice.actions;
export const waterReducer = waterSlice.reducer;
