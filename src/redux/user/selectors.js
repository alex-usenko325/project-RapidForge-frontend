export const selectUsersCount = state => state.user.count;
export const selectUser = state => state.user.user;
export const selectDailyNorm = state => state.user.user.dailyNorm;
export const selectIsRefreshing = state => state.user.isRefreshing;

export const selectLanguage = state => state.user.language;
export const selectShowConfetti = state => state.user.showConfetti;
export const selectIsConfettiShown = state => state.user.isConfettiShown;
export const selectLastConfettiDate = state => state.user.lastConfettiDate;
