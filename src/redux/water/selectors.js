export const selectSelectedDate = state => state.water.selectedDate;
export const selectWaterRecordsByMonth = state => state.water.monthIntakes;
export const selectWaterRecords = state => state.water.records;
export const selectWaterIsLoading = state => state.water.isLoading;
export const selectWaterError = state => state.water.error;

export const selectWaterProgress = state => {
  const dailyNorm = state.user.user.dailyNorm || 1500; // Якщо норма не задана, використовуємо 1500 мл
  const records = selectWaterRecords(state); // Тут отримуємо записи води
  const waterConsumed = records.reduce(
    (sum, record) => sum + (record.volume || 0), // Підсумовуємо об’єм води
    0
  );

  return dailyNorm > 0 ? Math.min((waterConsumed / dailyNorm) * 100, 100) : 0; // Повертаємо відсоток
};
