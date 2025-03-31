import { createSlice } from '@reduxjs/toolkit';
import {
  getClientsNumber,
  patchUserData,
  patchUserAvatar,
  getUserData,
} from './operations';
import { logout } from '../auth/operations.js';

// Зчитуємо мову з localStorage для початкового налаштування Redux
const savedLanguage = localStorage.getItem('i118nextLng');

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
  language: savedLanguage,
  showConfetti: false,
  isConfettiShown: false,
  lastConfettiDate: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeLanguage(state, action) {
      state.language = action.payload;
    },
    setShowConfetti(state, action) {
      state.showConfetti = action.payload;
    },
    setIsConfettiShown(state, action) {
      state.isConfettiShown = action.payload;
    },
    setLastConfettiDate(state, action) {
      state.lastConfettiDate = action.payload;
    },
  },
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
        state.user = action.payload;
        state.isRefreshingUser = false;
      })
      .addCase(getUserData.pending, state => {
        state.isRefreshingUser = true;
      })
      .addCase(getUserData.rejected, state => {
        state.isRefreshingUser = false;
      })
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
      // .addCase(logout.fulfilled, () => initialState);
      .addCase(logout.fulfilled, state => {
        return {
          ...initialState,
          lastConfettiDate: state.lastConfettiDate,
        };
      });
  },
});

export const {
  changeLanguage,
  setShowConfetti,
  setIsConfettiShown,
  setLastConfettiDate,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
