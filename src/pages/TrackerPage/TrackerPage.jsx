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
import TourSteps from '../../onboardingTour/TourSteps.jsx';

export default function TrackerPage() {
  const dispatch = useDispatch();
  const [isTour, setIsTour] = useState(false);

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
