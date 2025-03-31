import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedMonth } from '../../redux/water/selectors.js';
import { setSelectedMonth } from '../../redux/water/slice.js';
import dayjs from 'dayjs';
import sprite from '../../assets/sprite.svg';
import s from './CalendarPagination.module.css';

const CalendarPagination = ({ isStatisticVisible, toggleStatistic }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedMonth = useSelector(selectSelectedMonth);
  const [isChartOpen, setIsChartOpen] = useState(false);

  const handlePreviousMonth = () => {
    dispatch(
      setSelectedMonth(
        dayjs(selectedMonth).subtract(1, 'month').format('YYYY-MM')
      )
    );
  };

  const handleNextMonth = () => {
    dispatch(
      setSelectedMonth(dayjs(selectedMonth).add(1, 'month').format('YYYY-MM'))
    );
  };

  const toggleChart = () => {
    setIsChartOpen(prevState => !prevState);
  };

  const monthIndex = dayjs(selectedMonth).month();
  const months = t('months', { returnObjects: true });
  const month = months[Object.keys(months)[monthIndex]];
  const selectedYear = selectedMonth.split('-')[0];
  const dataShow = `${month}, ${selectedYear}`;

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

        <span className={s.spanmonth}>{dataShow}</span>
        <svg
          className={`${s.btnpagination} ${
            isStatisticVisible ? s.disabled : ''
          }`}
          onClick={handleNextMonth}
        >
          <use href={`${sprite}#icon-chevron-right`}></use>
        </svg>
        <svg
          className={`${s.iconpie} ${
            isChartOpen ? s.iconpieActive : ''
          } seventh-step`}
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
