import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedDate } from '../../redux/water/selectors.js';
import { useEffect, useState } from 'react';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import css from './TrackerPage.module.css';
import clsx from 'clsx';
import {
  getWaterByMonth,
  getWaterRecords,
} from '../../redux/water/operations.js';
import TourSteps from '../../onboardingTour/TourSteps.jsx';
import dayjs from 'dayjs';

export default function TrackerPage() {
  const dispatch = useDispatch();
  const [isTour, setIsTour] = useState(false);
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

  // Запустити тур вручну
  const handleStartTour = () => {
    setIsTour(true);
  };

  // Закрити тур після завершення
  const handleCloseTour = () => {
    setIsTour(false);
    localStorage.setItem('tourFinished', 'true');
  };

  return (
    <div className={clsx('container', css.container)}>
      {isTour ? (
        <TourSteps onClose={handleCloseTour}>
          <WaterMainInfo tourOn={handleStartTour} />
          <WaterDetailedInfo />
        </TourSteps>
      ) : (
        <>
          <WaterMainInfo tourOn={handleStartTour} />
          <WaterDetailedInfo />
        </>
      )}
    </div>
  );
}
