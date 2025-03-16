import { useEffect, useState } from 'react';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import css from './TrackerPage.module.css';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import {
  getWaterByMonth,
  getWaterRecords,
} from '../../redux/water/operations.js';
import { RotatingLines } from 'react-loader-spinner';
import { getUserData } from '../../redux/user/operations.js';

export default function TrackerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  
  useEffect(() => {
    async function fetchData() {
      await dispatch(getUserData()).unwrap();
      await dispatch(getWaterByMonth({ month, year })).unwrap();
      await dispatch(getWaterRecords()).unwrap();

      setIsLoading(false);
    }

    fetchData();
  }, [dispatch, year, month]);

  return (
    <div>
      {isLoading ? (
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      ) : (
        <div className={clsx('container', css.container)}>
          <WaterMainInfo />
          <WaterDetailedInfo />
        </div>
      )}
    </div>
  );
}
