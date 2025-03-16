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

  const handleClick = () => {
    const formattedDate = getFormattedDate(selectedDate, day);
    dispatch(setSelectedDate(formattedDate));
    onDateSelect(formattedDate);
  };

  const isSelected = dayjs(selectedDate).date() === day;

  return (
    <div className={s.calendaritem}>
      <button
        className={clsx(s.btnstyle, {
          [s.selected]: isSelected,
          [s.calendaritemfull]: percent >= 100,
          [s.calendaritemhalf]: percent > 0 && percent < 100,
        })}
        onClick={handleClick}
      >
        <div className={clsx(s.day, { [s.selectedDay]: isSelected })}>
          {day}
        </div>
        <div className={s.percentage}>
          <div className={s['percentage-value']}>
            {percent ? percent.toFixed(0) : 0}%
          </div>
        </div>
      </button>
    </div>
  );
};

export default CalendarItem;
