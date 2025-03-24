import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedDate } from '../../redux/water/selectors.js';
import { setSelectedDate } from '../../redux/water/slice.js';
import dayjs from 'dayjs';
import sprite from '../../assets/sprite.svg';
import s from './CalendarPagination.module.css';

const CalendarPagination = ({ isStatisticVisible, toggleStatistic }) => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectSelectedDate);

  const [isChartOpen, setIsChartOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const handlePreviousMonth = () => {
    dispatch(
      setSelectedDate(
        dayjs(selectedDate).subtract(1, 'month').format('YYYY-MM-DD')
      )
    );
  };

  const handleNextMonth = () => {
    dispatch(
      setSelectedDate(dayjs(selectedDate).add(1, 'month').format('YYYY-MM-DD'))
    );
  };

  const toggleChart = () => {
    setIsChartOpen(prevState => !prevState);
  };

  return (
    <div className={s.calendarpagination}>
      <div>
        <h1 className={s.month}>
          {isStatisticVisible
            ? t('calendarPagination.statistics')
            : t('calendarPagination.month')}
        </h1>
      </div>
      <div className={s.pagination}>
        <svg
          className={`${s.btnpagination} ${
            isStatisticVisible ? s.disabled : ''
          }`}
          onClick={handlePreviousMonth}
        >
          <use href={`${sprite}#icon-chevron-left`}></use>
        </svg>

        <span className={s.spanmonth}>
          {dayjs(selectedDate).locale(i18n.language).format('MMMM, YYYY')}
        </span>

        <svg
          className={`${s.btnpagination} ${
            isStatisticVisible ? s.disabled : ''
          }`}
          onClick={handleNextMonth}
        >
          <use href={`${sprite}#icon-chevron-right`}></use>
        </svg>
        <svg
          className={`${s.iconpie} ${isChartOpen ? s.iconpieActive : ''}`}
          onClick={() => {
            toggleStatistic();
            toggleChart();
          }}
        >
          <use href={`${sprite}#icon-pie-chart`}></use>
        </svg>
      </div>
    </div>
  );
};

export default CalendarPagination;
