export const selectWaterRecords = state => state.water.items;
export const selectWaterIsLoading = state => state.water.isLoading;
export const selectWaterError = state => state.water.isError;

export const selectWaterProgress = state => {
  const dailyNorm = state.auth.user.dailyNorm || 1500;
  const records = selectWaterRecords(state) || {};
  const waterConsumed = Object.values(records).reduce(
    (sum, record) => sum + (record.volume || 0),
    0
  );
  return dailyNorm > 0 ? Math.min((waterConsumed / dailyNorm) * 100, 100) : 0;
};

export const selectWaterData = state => state.water.waterData;
export const selectIsLoading = state => state.water.isLoading;
export const selectIsError = state => state.water.isError;
