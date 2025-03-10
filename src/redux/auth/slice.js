import { createSlice } from '@reduxjs/toolkit';
import { signin, logout, refreshUser, signup, getUserData } from './operations';

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
      });
  },
});

export const authReducer = authSlice.reducer;
