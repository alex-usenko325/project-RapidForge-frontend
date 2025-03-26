import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { createSelector } from 'reselect';

dayjs.extend(utc);
dayjs.extend(timezone);

export const selectSelectedDate = state => state.water.selectedDate;
export const selectWaterRecordsByMonth = state => state.water.monthIntakes;
export const selectWaterRecords = state => state.water.records;
export const selectWaterIsLoading = state => state.water.isLoading;
export const selectWaterError = state => state.water.error;

export const selectDailyNorm = state => state.user.user.dailyNorm || 1500;

export const selectWaterProgress = state => {
  const dailyNorm = selectDailyNorm(state);
  const records = selectWaterRecords(state);
  const todayDate = dayjs().format('YYYY-MM-DD');
  const todayRecords = records.filter(record => record.date === todayDate);
  const waterConsumed = todayRecords.reduce(
    (sum, record) => sum + (record.volume || 0),
    0
  );
  
  return dailyNorm > 0 ? Math.min((waterConsumed / dailyNorm) * 100, 100) : 0;
};

export const selectWaterProgressByMonth = createSelector(
  [selectWaterRecordsByMonth, selectDailyNorm],
  (waterData, dailyNorm) => {
    const waterByDay = waterData.reduce((acc, record) => {
      const date = dayjs(record.date).format('YYYY-MM-DD');
      acc[date] = (acc[date] || 0) + (record.volume || 0);
      return acc;
    }, {});
    const progressByDate = Object.keys(waterByDay).reduce((acc, date) => {
      const waterConsumed = waterByDay[date] || 0;
      acc[date] =
        dailyNorm > 0 ? Math.min((waterConsumed / dailyNorm) * 100, 100) : 0;
      return acc;
    }, {});

    return progressByDate;
  }
);
