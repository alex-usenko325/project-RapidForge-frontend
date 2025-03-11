// import { useEffect } from 'react';
// import CalendarItem from './CalendarItem';
// import s from './Calendar.module.css';
// import dayjs from 'dayjs';
// // import { fetchWaterPer } from "../../../../../redux/monthInfo/getWaterPercent.js";
// // import { useDispatch, useSelector } from 'react-redux';
// // import { selectWaterData } from '../../../../../redux/monthInfo/waterSlice.js';

// const getFormattedDate = selectedDate => {
//   return dayjs(selectedDate).format('YYYY-MM');
// };

// const Calendar = ({ selectedDate, setSelectedDate }) => {
//   // const dispatch = useDispatch();
//   // const waterData = useSelector(selectWaterData);

//   // useEffect(() => {
//   //   const formattedDate = getFormattedDate(selectedDate);
//   //   dispatch(fetchWaterPer(formattedDate));
//   // }, [selectedDate, dispatch]);

//   const daysInMonth = dayjs(selectedDate).daysInMonth();
//   const days = [...Array(daysInMonth)].map((_, dayIndex) => {
//     // const date = dayjs(selectedDate).date(day).format('YYYY-MM-DD');
//     // const dayData = waterData.find(d => d.day === date);
//     // const percent = dayData ? dayData.percent : undefined;

//     const day = dayIndex + 1;
//     return (
//       <CalendarItem
//         key={day}
//         day={day}
//         selectedDate={selectedDate}
//         onDateSelect={date => setSelectedDate(new Date(date))}
//         percent={0} // Замість undefined, встановлюємо 0 або інше значення за замовчуванням
//       />
//     );
//   });

//   return (
//     <div>
//       <div className={s.calendargrid}> {days} </div>{' '}
//     </div>
//   );
// };
// export default Calendar;

import { useEffect } from 'react';
import CalendarItem from './CalendarItem';
import s from './Calendar.module.css';
import dayjs from 'dayjs';
import { fetchWaterPer } from '../../../redux/monthInfo/getWaterPercent.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectWaterData } from '../../../redux/monthInfo/waterSlice.js';

const getFormattedDate = selectedDate => {
  return dayjs(selectedDate).format('YYYY-MM');
};

const Calendar = ({ selectedDate, setSelectedDate }) => {
  const dispatch = useDispatch();
  const waterData = useSelector(selectWaterData);

  useEffect(() => {
    const formattedDate = getFormattedDate(selectedDate);
    dispatch(fetchWaterPer(formattedDate));
  }, [selectedDate, dispatch]);

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
      <div className={s.calendargrid}> {days} </div>{' '}
    </div>
  );
};
export default Calendar;
