import { useDispatch, useSelector } from 'react-redux';
import {
  selectSelectedDate,
  selectSelectedMonth,
  selectWaterProgressByMonth,
} from '../../../redux/water/selectors.js';
import { useEffect } from 'react';
import { getWaterRecords } from '../../../redux/water/operations.js';
import dayjs from 'dayjs';
import CalendarItem from './CalendarItem.jsx';
import s from './Calendar.module.css';

const Calendar = () => {
  const dispatch = useDispatch();
  const getProgressForDate = useSelector(selectWaterProgressByMonth);
  const selectedDate = useSelector(selectSelectedDate);
  const selectedMonth = useSelector(selectSelectedMonth);
  const daysInMonth = dayjs(selectedMonth).daysInMonth();

  useEffect(() => {
    dispatch(getWaterRecords(selectedDate));
  }, [dispatch, selectedDate]);

  const days = [...Array(daysInMonth)].map((_, dayIndex) => {
    const day = dayIndex + 1;
    const date = `${selectedMonth}-${String(day).padStart(2, '0')}`;
    const percent = getProgressForDate[date] ?? 0;

    return <CalendarItem key={day} day={day} percent={percent} />;
  });
  return <div className={s.calendargrid}>{days}</div>;
};

export default Calendar;
