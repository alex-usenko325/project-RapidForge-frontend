import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedDate } from '../../redux/water/selectors.js';
import {
  getWaterByMonth,
  getWaterRecords,
} from '../../redux/water/operations.js';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import clsx from 'clsx';
import css from './TrackerPage.module.css';
import dayjs from 'dayjs';

export default function TrackerPage() {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectSelectedDate);
  const selectedDateFormatted = selectedDate.split('T')[0];
  const [year, month] = selectedDateFormatted.split('-');
  const todayDate = dayjs().format('YYYY-MM-DD');

  useEffect(() => {
    dispatch(getWaterByMonth({ month, year }));
  }, [dispatch, month, year]);

  useEffect(() => {
    dispatch(getWaterRecords(todayDate));
  }, [dispatch, todayDate]);

  return (
    <div className={clsx('container', css.container)}>
      <WaterMainInfo />
      <WaterDetailedInfo />
    </div>
  );
}
