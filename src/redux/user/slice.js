import { createSlice } from '@reduxjs/toolkit';
import {
  getClientsNumber,
  patchUserData,
  patchUserAvatar,
  getUserData,
} from './operations';
import { logout } from '../auth/operations.js';

const initialState = {
  user: {
    name: null,
    gender: 'woman',
    email: null,
    dailyNorm: 1500,
    weight: 0,
    time: 0,
    avatarUrl: null,
  },
  count: 0,
  isLoading: false,
  isRefreshing: false,
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
      })
      // Обробка результатів getUserData
      .addCase(getUserData.fulfilled, (state, action) => {
        console.log('🔥 Redux: отримані дані користувача', action.payload);
        state.user = action.payload;
        // state.isLoggedIn = true;
        state.isRefreshingUser = false;
      })
      .addCase(getUserData.pending, state => {
        state.isRefreshingUser = true;
      })
      .addCase(getUserData.rejected, state => {
        state.isRefreshingUser = false;
      })
      // patch user data
      .addCase(patchUserData.pending, state => {
        state.isLoading = true;
      })
      .addCase(patchUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(patchUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //patch user avatar
      .addCase(patchUserAvatar.pending, state => {
        state.isLoading = true;
      })
      .addCase(patchUserAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(patchUserAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, () => initialState);
  },
});

export const userReducer = userSlice.reducer;
