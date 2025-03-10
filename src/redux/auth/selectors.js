export const selectUser = state => state.auth.user;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectIsRefreshing = state => state.auth.isRefreshing;
export const selectDailyNorm = state => state.auth.user.dailyNorm;

// Нові селектори
export const selectVerificationStatus = state => state.auth.verificationStatus; // статус верифікації
export const selectVerificationError = state => state.auth.error; // помилка верифікації
