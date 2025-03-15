import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  deleteWaterRecord,
  getWaterRecords,
  fetchWaterPer,
  addWaterRecord,
  updateWaterRecord,
} from './operations';

const initialState = {
  items: [],
  operationType: 'add',
  itemId: '',
  waterDay: '',
  isError: null,
  isLoading: false,
  waterData: [],
};

const waterSlice = createSlice({
  name: 'water',
  initialState,
  reducers: {
    setOperationType: (state, action) => {
      state.operationType = action.payload;
    },
    setItemId: (state, action) => {
      state.itemId = action.payload;
    },
    setWaterDay: (state, action) => {
      state.waterDay = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getWaterRecords.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addWaterRecord.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteWaterRecord.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      })
      .addCase(fetchWaterPer.fulfilled, (state, action) => {
        state.waterData = action.payload;
      })
      .addMatcher(
        isAnyOf(
          getWaterRecords.pending,
          addWaterRecord.pending,
          updateWaterRecord.pending,
          fetchWaterPer.pending
        ),
        state => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          getWaterRecords.fulfilled,
          addWaterRecord.fulfilled,
          updateWaterRecord.fulfilled,
          fetchWaterPer.fulfilled
        ),
        state => {
          state.isLoading = false;
          state.isError = null;
        }
      )
      .addMatcher(
        isAnyOf(
          getWaterRecords.rejected,
          addWaterRecord.rejected,
          deleteWaterRecord.rejected,
          updateWaterRecord.rejected,
          fetchWaterPer.rejected
        ),
        state => {
          state.isLoading = false;
          state.isError = true;
        }
      );
  },
});

export default waterSlice.reducer;

export const { setOperationType, setItemId, setWaterDay } = waterSlice.actions;

export const selectWaterItem = state => state.water.items;
export const selectOperationType = state => state.water.operationType;
export const selectIsError = state => state.water.isError;
export const selectIsLoading = state => state.water.isLoading;
export const selectItemId = state => state.water.itemId;
export const selectWaterDay = state => state.water.waterDay;

export const selectWaterData = state => state.water.waterData;
export const selectIsLoadingPer = state => state.water.isLoading;
export const selectIsErrorPer = state => state.water.isError;
