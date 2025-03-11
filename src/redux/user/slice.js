import { createSlice } from '@reduxjs/toolkit';
import { getClientsNumber } from './operations';

const initialState = {
  count: 0,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getClientsNumber.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getClientsNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.count = action.payload;
      })
      .addCase(getClientsNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const userReducer = userSlice.reducer;
