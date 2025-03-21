import { createSlice } from '@reduxjs/toolkit';
import {
  signin,
  logout,
  refreshAccessToken,
  signup,
  sendVerificationEmail,
  verifyEmail,
  sendResetPasswordEmail,
  resetPassword,
} from './operations';

const initialState = {
  email: null,
  token: null,
  isLoggedIn: false,
  isLoading: false,
  isRefreshing: false,
  isRefreshingUser: false,
  verificationStatus: 'idle',
  verificationError: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(signup.pending, state => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.isLoading = false;
      })
      .addCase(signup.rejected, state => {
        state.isLoading = false;
      })
      .addCase(signin.pending, state => {
        state.isLoading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(signin.rejected, state => {
        state.isLoading = false;
      })
      .addCase(logout.pending, state => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, () => initialState)
      .addCase(logout.rejected, state => {
        state.isLoading = false;
      })
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
      .addCase(sendVerificationEmail.pending, state => {
        state.verificationStatus = 'loading';
        state.error = null;
      })
      .addCase(sendVerificationEmail.fulfilled, state => {
        state.verificationStatus = 'success';
      })
      .addCase(sendVerificationEmail.rejected, (state, action) => {
        state.verificationStatus = 'failed';
        state.error = action.payload || 'Failed to send verification email';
      })
      .addCase(verifyEmail.pending, state => {
        state.verificationStatus = 'loading';
        state.verificationError = null;
      })
      .addCase(verifyEmail.fulfilled, state => {
        state.verificationStatus = 'succeeded';
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.verificationStatus = 'failed';
        state.verificationError = action.payload;
      })
      .addCase(sendResetPasswordEmail.pending, state => {
        state.verificationStatus = 'loading';
        state.verificationError = null;
      })
      .addCase(sendResetPasswordEmail.fulfilled, state => {
        state.verificationStatus = 'succeeded';
      })
      .addCase(sendResetPasswordEmail.rejected, (state, action) => {
        state.verificationStatus = 'failed';
        state.verificationError = action.payload;
      })
      .addCase(resetPassword.pending, state => {
        state.verificationStatus = 'loading';
        state.verificationError = null;
      })
      .addCase(resetPassword.fulfilled, state => {
        state.verificationStatus = 'succeeded';
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.verificationStatus = 'failed';
        state.verificationError = action.payload; // Зберігаємо помилку
      });
  },
});

export const authReducer = authSlice.reducer;
