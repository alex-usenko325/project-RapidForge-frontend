import CalendarItem from './CalendarItem';
import s from './Calendar.module.css';
import dayjs from 'dayjs';
import 'dayjs/locale/uk'; // Для української локалізації
import { useSelector } from 'react-redux';
import { selectWaterRecordsByMonth } from '../../../redux/water/selectors.js';

dayjs.locale('uk'); // Встановлюємо локаль

const Calendar = ({ selectedDate, setSelectedDate }) => {
  const waterData = useSelector(selectWaterRecordsByMonth);
  const daysInMonth = dayjs(selectedDate).daysInMonth();

  const days = [...Array(daysInMonth)].map((_, dayIndex) => {
    const day = dayIndex + 1;
    const date = dayjs(selectedDate).date(day).format('YYYY-MM-DD');
    const dayData = waterData.find(d => d.day === date);
    const percent = dayData ? dayData.percent : undefined;

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

  return (
    <div>
      <div className={s.calendargrid}>{days}</div>
    </div>
  );
};

export default Calendar;
