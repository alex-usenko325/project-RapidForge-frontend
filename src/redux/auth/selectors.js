export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectIsRefreshing = state => state.auth.isRefreshing;

// Нові селектори
export const selectVerificationStatus = state => state.auth.verificationStatus; // статус верифікації
export const selectVerificationError = state => state.auth.error; // помилка верифікації
