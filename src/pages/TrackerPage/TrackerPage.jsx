import { useEffect } from 'react';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import css from './TrackerPage.module.css';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  getWaterByMonth,
  getWaterRecords,
} from '../../redux/water/operations.js';
import {
  selectConfettiShown,
  selectLastConfettiDate,
  selectShowConfetti,
  selectWaterProgress,
} from '../../redux/water/selectors.js';
import GoalAchievedNotification from '../../components/GoalAchievedNotification/GoalAchievedNotification.jsx';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import {
  setShowConfetti,
  setConfettiShown,
  setLastConfettiDate,
} from '../../redux/water/slice.js';

export default function TrackerPage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const progress = useSelector(selectWaterProgress);
  const showConfetti = useSelector(selectShowConfetti);
  const confettiShown = useSelector(selectConfettiShown);
  const lastConfettiDate = useSelector(selectLastConfettiDate);

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

  useEffect(() => {
    const storedDate = localStorage.getItem('lastConfettiDate');
    if (storedDate) {
      dispatch(setLastConfettiDate(storedDate));
    }
  }, [dispatch]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // Поточна дата

    if (progress === 100 && !confettiShown && lastConfettiDate !== today) {
      dispatch(setLastConfettiDate(today));
      localStorage.setItem('lastConfettiDate', today); // Збереження дати

      dispatch(setShowConfetti(true));
      dispatch(setConfettiShown(true));
      localStorage.setItem('confettiShown', 'true'); // Збереження в localStorage

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
  }, [progress, dispatch, confettiShown, lastConfettiDate, t]);

  return (
    <>
      {showConfetti && <GoalAchievedNotification />}
      <div className={clsx('container', css.container)}>
        <WaterMainInfo />
        <WaterDetailedInfo />
      </div>
    </>
  );
}
