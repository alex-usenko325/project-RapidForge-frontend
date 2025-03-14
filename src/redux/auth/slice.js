import { createSlice } from '@reduxjs/toolkit';
import {
  signin,
  logout,
  refreshUser,
  signup,
  getUserData,
  sendVerificationEmail,
  verifyEmail,
  patchUserData,
  patchUserAvatar,
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
        state.token = action.payload.accessToken;
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
        // state.isLoggedIn = true;
        state.isRefreshingUser = false;
      })
      .addCase(getUserData.pending, state => {
        state.isRefreshingUser = true;
      })
      .addCase(getUserData.rejected, state => {
        state.isRefreshingUser = false;
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
      });
  },
});

export const authReducer = authSlice.reducer;
