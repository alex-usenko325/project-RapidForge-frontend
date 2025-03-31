import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDate } from '../../../redux/water/slice';
import {
  selectSelectedDate,
  selectSelectedMonth,
} from '../../../redux/water/selectors.js';
import dayjs from 'dayjs';
import clsx from 'clsx';
import s from './CalendarItem.module.css';

const CalendarItem = ({ day, percent = 0 }) => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(selectSelectedDate);
  const selectedMonth = useSelector(selectSelectedMonth);

  const formattedDate = `${selectedMonth}-${String(day).padStart(2, '0')}`;
  const todayFormatted = dayjs().format('YYYY-MM-DD');
  const isFutureDay = dayjs(formattedDate).isAfter(todayFormatted, 'day');
  const isCurrentDay = formattedDate === todayFormatted;
  const isSelected = formattedDate === selectedDate;

  const handleClick = () => {
    if (isFutureDay) {
      alert('Ви не можете обрати майбутній день!');
      return;
    }
    dispatch(setSelectedDate(formattedDate));
  };

  const displayPercent = isFutureDay ? '' : percent ? percent.toFixed(0) : 0;

  return (
    <div className={s.calendaritem}>
      <button
        type="button"
        className={clsx(s.btnstyle, {
          [s.selected]: isSelected,
          [s.calendaritemfull]: percent >= 100,
          [s.calendaritemhalf]: percent > 0 && percent < 100,
          [s.currentDay]: isCurrentDay,
          [s.disabled]: isFutureDay,
        })}
        onClick={handleClick}
        disabled={isFutureDay}
      >
        <div className={clsx(s.day, { [s.selectedDay]: isSelected })}>
          {day}
        </div>
        <div className={s.percentage}>
          {displayPercent !== '' && (
            <div className={s['percentage-value']}>{displayPercent}%</div>
          )}
        </div>
      </button>
    </div>
  );
};

export default CalendarItem;
