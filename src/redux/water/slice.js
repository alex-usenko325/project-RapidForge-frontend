import { createSlice } from '@reduxjs/toolkit';
import {
  getWaterRecords,
  addWaterRecord,
  updateWaterRecord,
  deleteWaterRecord,
  getWaterByMonth,
} from './operations';
import { logout } from '../auth/operations.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const initialState = {
  monthIntakes: [],
  records: [],
  isLoading: false,
  error: null,
  selectedDate: dayjs().tz(userTimezone).format(),
  showConfetti: false,
  confettiShown: false,
  lastConfettiDate: null,
};

const waterSlice = createSlice({
  name: 'water',
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setShowConfetti: (state, action) => {
      state.showConfetti = action.payload;
    },
    setConfettiShown: (state, action) => {
      state.confettiShown = action.payload;
    },
    setLastConfettiDate: (state, action) => {
      state.lastConfettiDate = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getWaterByMonth.fulfilled, (state, { payload }) => {
        state.monthIntakes = payload;
        state.isLoading = false;
      })
      .addCase(getWaterByMonth.pending, state => {
        state.isLoading = true;
      })
      .addCase(getWaterByMonth.rejected, state => {
        state.isLoading = false;
      })
      .addCase(getWaterRecords.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getWaterRecords.fulfilled, (state, action) => {
        state.isLoading = false;
        state.records = action.payload.data;
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
        if (state.selectedDate) {
          const recordDate = dayjs(action.payload.date).tz(userTimezone);
          const selectedMonth = dayjs(state.selectedDate)
            .tz(userTimezone)
            .month();
          const selectedYear = dayjs(state.selectedDate)
            .tz(userTimezone)
            .year();
          if (
            recordDate.month() === selectedMonth &&
            recordDate.year() === selectedYear
          ) {
            state.monthIntakes.push(action.payload);
          }
        }
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
        const recordIndex = state.records.findIndex(
          record => record._id === updatedRecord._id
        );
        if (recordIndex !== -1) {
          state.records[recordIndex] = updatedRecord;
        }
        if (state.selectedDate) {
          const recordDate = dayjs(updatedRecord.date).tz(userTimezone);
          const selectedMonth = dayjs(state.selectedDate)
            .tz(userTimezone)
            .month();
          const selectedYear = dayjs(state.selectedDate)
            .tz(userTimezone)
            .year();

          const monthIndex = state.monthIntakes.findIndex(
            record => record._id === updatedRecord._id
          );

          if (
            recordDate.month() === selectedMonth &&
            recordDate.year() === selectedYear &&
            monthIndex !== -1
          ) {
            state.monthIntakes[monthIndex] = updatedRecord;
          }
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
        state.monthIntakes = state.monthIntakes.filter(
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

export const {
  setSelectedDate,
  setShowConfetti,
  setConfettiShown,
  setLastConfettiDate,
} = waterSlice.actions;
export const waterReducer = waterSlice.reducer;
