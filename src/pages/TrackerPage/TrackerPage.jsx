import { useEffect } from 'react';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import css from './TrackerPage.module.css';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import {
  getWaterByMonth,
  getWaterRecords,
} from '../../redux/water/operations.js';

export default function TrackerPage() {
  const dispatch = useDispatch();

  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');

  useEffect(() => {
    async function fetchData() {
      await dispatch(getWaterByMonth({ month, year })).unwrap();
      await dispatch(getWaterRecords()).unwrap();
    }

    fetchData();
  }, [dispatch, year, month]);

  return (
    <div className={clsx('container', css.container)}>
      <WaterMainInfo />
      <WaterDetailedInfo />
    </div>
  );
}
