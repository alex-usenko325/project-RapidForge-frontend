import { useDispatch, useSelector } from 'react-redux';
import {
  selectSelectedDate,
  selectWaterProgressByMonth,
} from '../../../redux/water/selectors.js';
import { setSelectedDate } from '../../../redux/water/slice.js';
import dayjs from 'dayjs';
import CalendarItem from './CalendarItem.jsx';
import s from './Calendar.module.css';

const Calendar = () => {
  const dispatch = useDispatch()
  const getProgressForDate = useSelector(selectWaterProgressByMonth);
  const selectedDate = useSelector(selectSelectedDate);

  const daysInMonth = dayjs(selectedDate).daysInMonth();

  const days = [...Array(daysInMonth)].map((_, dayIndex) => {
    const day = dayIndex + 1;
    const date = dayjs(selectedDate).date(day).format('YYYY-MM-DD');
    const percent = getProgressForDate[date] ?? 0;
    return (
      <CalendarItem
        key={day}
        day={day}
        onDateSelect={date => dispatch(setSelectedDate(new Date(date)))}
        percent={percent}
      />
    );
  });

  return <div className={s.calendargrid}>{days}</div>;
};

export default Calendar;
