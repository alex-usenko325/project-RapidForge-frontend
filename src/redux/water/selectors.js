export const selectWaterRecords = state => state.water.records;
export const selectWaterIsLoading = state => state.water.isLoading;
export const selectWaterError = state => state.water.error;

export const selectWaterProgress = state => {
  const dailyNorm = state.auth.user.dailyNorm || 1500;
  const records = selectWaterRecords(state);
  const recordsArray = Array.isArray(records)
    ? records
    : Object.values(records);
  const waterConsumed = recordsArray.reduce(
    (sum, record) => sum + (record.volume || 0),
    0
  );
  return dailyNorm > 0 ? Math.min((waterConsumed / dailyNorm) * 100, 100) : 0;
};
