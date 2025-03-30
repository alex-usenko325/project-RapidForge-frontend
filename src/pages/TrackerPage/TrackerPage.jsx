import { useDispatch, useSelector } from 'react-redux';
import {
  selectSelectedDate,
  selectWaterProgress,
} from '../../redux/water/selectors.js';
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
import {
  selectConfettiShown,
  selectLastConfettiDate,
  selectShowConfetti,
} from '../../redux/user/selectors.js';
import {
  setShowConfetti,
  setConfettiShown,
  setLastConfettiDate,
} from '../../redux/user/slice.js';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import GoalAchievedNotification from '../../components/GoalAchievedNotification/GoalAchievedNotification.jsx';

export default function TrackerPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isTour, setIsTour] = useState(false);
  const selectedDate = useSelector(selectSelectedDate);
  const selectedDateFormatted = selectedDate.split('T')[0];
  const [year, month] = selectedDateFormatted.split('-');
  const todayDate = dayjs().format('YYYY-MM-DD');
  const progress = useSelector(selectWaterProgress);
  const showConfetti = useSelector(selectShowConfetti);
  const confettiShown = useSelector(selectConfettiShown);
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
    if (!lastConfettiDate) {
      dispatch(setLastConfettiDate(todayDate));
    }
  }, [dispatch, lastConfettiDate, todayDate]);
  console.log(todayDate);

  useEffect(() => {
    if (progress === 100 && !confettiShown && lastConfettiDate !== todayDate) {
      dispatch(setShowConfetti(true));
      dispatch(setConfettiShown(true));
      dispatch(setLastConfettiDate(todayDate));

      toast.custom(
        toastInstance => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: '1px solid #4CAF50',
              padding: '16px',
              backgroundColor: '#E8F5E9',
              borderRadius: '8px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              maxWidth: '350px',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            <span>👏 {t('waterDailyNorma.goalAchieved')}</span>
            <button
              onClick={() => toast.remove(toastInstance.id)}
              style={{
                marginLeft: '16px',
                padding: '4px 8px',
                background: '#4CAF50',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              {t('verifyModal.button')}
            </button>
          </div>
        ),
        { duration: 10000 }
      );
    }
  }, [progress, dispatch, confettiShown, lastConfettiDate, t, todayDate]);

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
