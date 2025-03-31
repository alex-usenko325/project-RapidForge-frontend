import { useDispatch, useSelector } from 'react-redux';
import {
  selectSelectedMonth,
  selectWaterProgress,
} from '../../redux/water/selectors.js';
import { useEffect, useState } from 'react';
import {
  getWaterByMonth,
  getWaterRecords,
} from '../../redux/water/operations.js';
import dayjs from 'dayjs';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import TourSteps from '../../onboardingTour/TourSteps.jsx';
import clsx from 'clsx';
import css from './TrackerPage.module.css';
import {
  selectIsConfettiShown,
  selectLastConfettiDate,
  selectShowConfetti,
} from '../../redux/user/selectors.js';
import {
  setShowConfetti,
  setIsConfettiShown,
  setLastConfettiDate,
} from '../../redux/user/slice.js';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import GoalAchievedNotification from '../../components/GoalAchievedNotification/GoalAchievedNotification.jsx';

export default function TrackerPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isTour, setIsTour] = useState(false);
  const selectedMonth = useSelector(selectSelectedMonth);

  const [year, month] = selectedMonth.split('-');
  const todayDate = dayjs().format('YYYY-MM-DD');
  const progress = useSelector(selectWaterProgress);
  const showConfetti = useSelector(selectShowConfetti);
  const isConfettiShown = useSelector(selectIsConfettiShown);
  const lastConfettiDate = useSelector(selectLastConfettiDate);

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

  useEffect(() => {
    if (
      progress === 100 &&
      !isConfettiShown &&
      lastConfettiDate !== todayDate
    ) {
      dispatch(setShowConfetti(true));
      dispatch(setIsConfettiShown(true));
      dispatch(setLastConfettiDate(todayDate));

      toast.custom(
        toastInstance => (
          <div className={css.toastContainer}>
            <span>👏 {t('waterDailyNorma.goalAchieved')}</span>
            <button
              onClick={() => toast.remove(toastInstance.id)}
              className={css.toastButton}
            >
              {t('verifyModal.button')}
            </button>
          </div>
        ),
        { duration: 10000 }
      );
    }
  }, [progress, dispatch, isConfettiShown, lastConfettiDate, t, todayDate]);

  return (
    <div className={clsx('container', css.container)}>
      {isTour ? (
        <TourSteps onClose={handleCloseTour}>
          <WaterMainInfo tourOn={handleStartTour} />
          <WaterDetailedInfo />
        </TourSteps>
      ) : (
        <>
          {showConfetti && <GoalAchievedNotification />}
          <WaterMainInfo tourOn={handleStartTour} />
          <WaterDetailedInfo />
        </>
      )}
    </div>
  );
}
