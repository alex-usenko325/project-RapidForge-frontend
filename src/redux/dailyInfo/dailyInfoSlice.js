import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addWaterItem,
  deleteWaterItem,
  fetchWaterItem,
  updateWaterItem,
} from "./dailyInfoOps.js";

const initialState = {
  items: [],
  operationType: "add",
  itemId: "",
  waterDay: "",
  isError: null,
  isLoading: false,
};

const slice = createSlice({
  name: "waterItem",
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchWaterItem.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addWaterItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateWaterItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteWaterItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addCase(deleteWaterItem.rejected, (state, action) => {
        console.error("Failed to delete water item:", action.payload);
      })

      .addMatcher(
        isAnyOf(
          fetchWaterItem.pending,
          addWaterItem.pending,
          updateWaterItem.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchWaterItem.fulfilled,
          addWaterItem.fulfilled,
          updateWaterItem.fulfilled
        ),
        (state) => {
          state.isLoading = false;
          state.isError = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchWaterItem.rejected,
          addWaterItem.rejected,
          deleteWaterItem.rejected,
          updateWaterItem.rejected
        ),
        (state) => {
          state.isLoading = false;
          state.isError = true;
        }
      );
  },
});

export const waterItemReducer = slice.reducer;
export const { setOperationType, setItemId, setWaterDay } = slice.actions;

export const selectWaterItem = (state) => state.waterItem.items;
export const selectOperationType = (state) => state.waterItem.operationType;
export const selectIsError = (state) => state.waterItem.isError;
export const selectIsLoading = (state) => state.waterItem.isLoading;
export const selectItemId = (state) => state.waterItem.itemId;
export const selectWaterDay = (state) => state.waterItem.waterDay;
