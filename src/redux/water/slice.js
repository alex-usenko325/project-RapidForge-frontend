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
  todayRecords: [],
  records: [],
  isLoading: false,
  error: null,
  selectedDate: dayjs().tz(userTimezone).format(),
  selectedMonth: dayjs().tz(userTimezone).format('YYYY-MM'),
};

const waterSlice = createSlice({
  name: 'water',
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setSelectedMonth: (state, action) => {
      state.selectedMonth = action.payload;
    },
  },
  extraReducers: builder => {
    const today = dayjs().format('YYYY-MM-DD');
    builder
      .addCase(getWaterByMonth.pending, state => {
        state.isLoading = true;
      })
      .addCase(getWaterByMonth.fulfilled, (state, action) => {
        state.monthIntakes = action.payload;
        state.isLoading = false;
      })
      .addCase(getWaterByMonth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getWaterRecords.pending, state => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(getWaterRecords.fulfilled, (state, action) => {
        state.isLoading = false;

        if (state.todayRecords.length === 0) {
          state.todayRecords = action.payload.data.filter(
            record => record.date === today
          );
        }
        state.records = action.payload.data.filter(
          record => record.date !== today
        );
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

        if (action.payload.date === today) {
          state.todayRecords.push(action.payload);
        } else {
          state.records.push(action.payload);
        }
        state.monthIntakes.push(action.payload);
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

        if (action.payload.date === today) {
          const todayRecordIndex = state.todayRecords.findIndex(
            record => record._id === action.payload._id
          );
          if (todayRecordIndex !== -1) {
            state.todayRecords[todayRecordIndex] = action.payload;
          } else {
            state.todayRecords.push(action.payload);
          }
        } else {
          const recordIndex = state.records.findIndex(
            record => record._id === action.payload._id
          );
          if (recordIndex !== -1) {
            state.records[recordIndex] = action.payload;
          } else {
            state.records.push(action.payload);
          }
        }

        const monthIndex = state.monthIntakes.findIndex(
          record => record._id === action.payload._id
        );

        if (monthIndex !== -1) {
          state.monthIntakes[monthIndex] = action.payload;
        } else {
          state.monthIntakes.push(action.payload);
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
        const deletedRecordId = action.payload;
        const deletedRecord =
          state.todayRecords.find(record => record._id === deletedRecordId) ||
          (state.records.find(record => record._id === deletedRecordId) &&
            state.monthIntakes.find(record => record._id === deletedRecordId));

        if (deletedRecord) {
          if (deletedRecord.date === today) {
            state.todayRecords = state.todayRecords.filter(
              record => record._id !== deletedRecordId
            );
          } else {
            state.records = state.records.filter(
              record => record._id !== deletedRecordId
            );
          }

          state.monthIntakes = state.monthIntakes.filter(
            record => record._id !== deletedRecordId
          );
        }
      })
      .addCase(deleteWaterRecord.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, () => initialState);
  },
});

export const { setSelectedDate, setSelectedMonth } = waterSlice.actions;
export const waterReducer = waterSlice.reducer;
