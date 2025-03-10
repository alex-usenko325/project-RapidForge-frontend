import { createSelector } from '@reduxjs/toolkit';

export const selectWaterRecords = state => state.water.records;
export const selectWaterIsLoading = state => state.water.isLoading;
export const selectWaterError = state => state.water.error;

export const selectWaterProgress = state => {
  const dailyNorm = state.auth.user.dailyNorm || 1500;
  const records = selectWaterRecords(state);
  const waterConsumed = records.reduce(
    (sum, record) => sum + (record.volume || 0),
    0
  );
  return dailyNorm > 0 ? Math.min((waterConsumed / dailyNorm) * 100, 100) : 0;
};

// Мемоїзований селектор для статистики з додатковою перевіркою
export const selectWaterStats = createSelector(
  [selectWaterRecords, state => state.auth.user.dailyNorm || 1500],
  (records, dailyNorm) => {
    const waterConsumed = records.reduce(
      (sum, record) => sum + (record.volume || 0),
      0
    );
    const remaining = Math.max(0, dailyNorm - waterConsumed);
    // Повертаємо стабільний об’єкт (але це не вирішує проблему, якщо records змінює референцію)
    return { waterConsumed, dailyNorm, remaining };
  }
);
