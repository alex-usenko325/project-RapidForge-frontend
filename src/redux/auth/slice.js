import { createSlice } from '@reduxjs/toolkit';
import {
  signin,
  logout,
  refreshAccessToken,
  signup,
  sendVerificationEmail,
  verifyEmail,
} from './operations';

const initialState = {
  email: null,
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isRefreshingUser: false,
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
        // state.user = action.payload.user;
        state.email = action.payload.email;
      })
      .addCase(signup.rejected, () => initialState)

      // Обробка результатів signin
      .addCase(signin.fulfilled, (state, action) => {
        console.log('✅ Логін успішний, токен:', action.payload.token);
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
      })

      // Обробка результатів logout
      .addCase(logout.fulfilled, () => initialState)

      // Обробка результатів refreshUser
      .addCase(refreshAccessToken.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshAccessToken.rejected, state => {
        state.isRefreshing = false;
        state.token = null;
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
