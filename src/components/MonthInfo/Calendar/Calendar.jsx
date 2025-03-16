import CalendarItem from './CalendarItem';
import s from './Calendar.module.css';
import dayjs from 'dayjs';
import 'dayjs/locale/uk'; // Українська локалізація
import { useSelector } from 'react-redux';
import { selectWaterRecordsByMonth } from '../../../redux/water/selectors.js';

dayjs.locale('uk'); // Встановлюємо локаль

const Calendar = ({ selectedDate, setSelectedDate, dailyNorm = 1500 }) => {
  const waterData = useSelector(selectWaterRecordsByMonth);
  const daysInMonth = dayjs(selectedDate).daysInMonth();

  // Групуємо дані за днями (щоб швидко отримувати об'єм води)
  const waterByDay = waterData.reduce((acc, record) => {
    const { date, volume } = record;
    acc[date] = (acc[date] || 0) + volume; // Підсумовуємо обсяг води за день
    return acc;
  }, {});

  const days = [...Array(daysInMonth)].map((_, dayIndex) => {
    const day = dayIndex + 1;
    const date = dayjs(selectedDate).date(day).format('YYYY-MM-DD');

    const waterConsumed = waterByDay[date] || 0; // Випита вода за день
    const percent = Math.min((waterConsumed / dailyNorm) * 100, 100); // Розраховуємо %

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
