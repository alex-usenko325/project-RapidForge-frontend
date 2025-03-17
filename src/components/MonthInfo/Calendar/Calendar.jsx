import CalendarItem from './CalendarItem.jsx';
import s from './Calendar.module.css';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import utc from 'dayjs/plugin/utc'; // Додай
import timezone from 'dayjs/plugin/timezone';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectWaterProgressByMonth,
  selectWaterRecords,
} from '../../../redux/water/selectors.js';
import { getWaterByMonth } from '../../../redux/water/operations.js';
import { useEffect } from 'react';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('uk');

const Calendar = ({ selectedDate, setSelectedDate }) => {
  const dispatch = useDispatch();
  const getProgressForDate = useSelector(selectWaterProgressByMonth);
  const records = useSelector(selectWaterRecords);
  const daysInMonth = dayjs(selectedDate).tz('Europe/Kyiv').daysInMonth();

  useEffect(() => {
    const month = dayjs(selectedDate).tz('Europe/Kyiv').month() + 1;
    const year = dayjs(selectedDate).tz('Europe/Kyiv').year();
    dispatch(getWaterByMonth({ month, year }));
  }, [selectedDate, records, dispatch]);

  const days = [...Array(daysInMonth)].map((_, dayIndex) => {
    const day = dayIndex + 1;
    const date = dayjs(selectedDate)
      .tz('Europe/Kyiv')
      .date(day)
      .format('YYYY-MM-DD');

    const percent = getProgressForDate[date] ?? 0;

    return (
      <CalendarItem
        key={day}
        day={day}
        selectedDate={selectedDate}
        onDateSelect={date => setSelectedDate(new Date(date))}
        percent={percent}
      />
    );
  });

  return <div className={s.calendargrid}>{days}</div>;
};

export default Calendar;
