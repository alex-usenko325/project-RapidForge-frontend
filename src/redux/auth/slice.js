import { createSlice } from '@reduxjs/toolkit';
import {
  signin,
  logout,
  refreshUser,
  signup,
  getUserData,
  sendVerificationEmail,
  verifyEmail,
} from './operations';

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
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  verificationStatus: 'idle', // Статус для верифікації
  verificationError: null, // Для збереження помилок верифікації
  error: null, // Для обробки загальних помилок
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      // Обробка результатів signup
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })

      // Обробка результатів signin
      .addCase(signin.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
      })

      // Обробка результатів logout
      .addCase(logout.fulfilled, () => initialState)

      // Обробка результатів refreshUser
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
        state.token = null;
      })

      // Обробка результатів getUserData
      .addCase(getUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(getUserData.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(getUserData.rejected, state => {
        state.isRefreshing = false;
      })

      // Обробка результатів sendVerificationEmail
      .addCase(sendVerificationEmail.pending, state => {
        state.verificationStatus = 'loading'; // Запит йде
        state.error = null;
      })
      .addCase(sendVerificationEmail.fulfilled, state => {
        state.verificationStatus = 'success'; // Успіх
      })
      .addCase(sendVerificationEmail.rejected, (state, action) => {
        state.verificationStatus = 'failed'; // Помилка
        state.error = action.payload || 'Failed to send verification email'; // Зберігаємо помилку
      })

      // Оновлення для операції verifyEmail
      .addCase(verifyEmail.pending, state => {
        state.verificationStatus = 'loading'; // Запит йде
        state.verificationError = null;
      })
      .addCase(verifyEmail.fulfilled, state => {
        state.verificationStatus = 'succeeded'; // Успіх
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.verificationStatus = 'failed'; // Помилка
        state.verificationError = action.payload; // Зберігаємо помилку
      });
  },
});

export const authReducer = authSlice.reducer;
