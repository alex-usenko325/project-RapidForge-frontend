import { useDispatch } from 'react-redux';
import { setSelectedDate } from '../../../redux/water/slice';
import clsx from 'clsx';
import s from './CalendarItem.module.css';
import dayjs from 'dayjs';

const CalendarItem = ({ day, selectedDate, onDateSelect, percent = 0 }) => {
  const dispatch = useDispatch();

  const getFormattedDate = (selectedDate, day) => {
    const date = new Date(selectedDate);
    date.setDate(day);
    return dayjs(date).format('YYYY-MM-DD');
  };

  const formattedDate = getFormattedDate(selectedDate, day);

  const todayFormatted = dayjs().format('YYYY-MM-DD');

  const isFutureDay = dayjs(formattedDate).isAfter(dayjs(), 'day');

  const isCurrentDay = formattedDate === todayFormatted;

  const isSelected = dayjs(selectedDate).date() === day;

  const handleClick = () => {
    if (isFutureDay) {
      alert('Ви не можете обрати майбутній день!');
      return;
    }
    const formattedDate = getFormattedDate(selectedDate, day);
    dispatch(setSelectedDate(formattedDate));
    onDateSelect(formattedDate);
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
