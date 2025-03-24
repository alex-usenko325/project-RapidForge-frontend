import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSelectedDate,
  selectWaterRecords,
} from '../../redux/water/selectors.js';
import {
  getWaterByMonth,
  getWaterRecords,
} from '../../redux/water/operations.js';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import dayjs from 'dayjs';
import clsx from 'clsx';
import css from './TrackerPage.module.css';

export default function TrackerPage() {
  const dispatch = useDispatch();
  const records = useSelector(selectWaterRecords);
  const selectedDate = useSelector(selectSelectedDate);

  useEffect(() => {
    const month = dayjs(selectedDate).month() + 1;
    const year = dayjs(selectedDate).year();
    dispatch(getWaterByMonth({ month, year }));
  }, [dispatch, records, selectedDate]);

  useEffect(() => {
    dispatch(getWaterRecords());
  }, [dispatch]);

  return (
    <div className={clsx('container', css.container)}>
      <WaterMainInfo />
      <WaterDetailedInfo />
    </div>
  );
}
