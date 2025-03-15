import dayjs from 'dayjs';
import s from './CalendarPagination.module.css';
import sprite from '../../assets/sprite.svg';
import { useTranslation } from 'react-i18next';
import 'dayjs/locale/uk';
const CalendarPagination = ({ selectedDate, onDateChange }) => {
  const { t } = useTranslation();
  dayjs.locale('uk');
  const handlePreviousMonth = () => {
    onDateChange(dayjs(selectedDate).subtract(1, 'month').toDate());
  };

  const handleNextMonth = () => {
    onDateChange(dayjs(selectedDate).add(1, 'month').toDate());
  };

  return (
    <div className={s.calendarpagination}>
      <div>
        <h1 className={s.month}>{t('calendarPagination.month')}</h1>
      </div>
      <div className={s.pagination}>
        <svg className={s.btnpagination} onClick={handlePreviousMonth}>
          <use href={`${sprite}#icon-chevron-left`}></use>
        </svg>

        <span className={s.spanmonth}>
          {dayjs(selectedDate).format('MMMM, YYYY')}
        </span>

        <svg className={s.btnpagination} onClick={handleNextMonth}>
          <use href={`${sprite}#icon-chevron-right`}></use>
        </svg>
        <svg className={s.iconpie}>
          <use href={`${sprite}#icon-pie-chart`}></use>
        </svg>
      </div>
    </div>
  );
};

export default CalendarPagination;
