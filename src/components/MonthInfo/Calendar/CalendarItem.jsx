// ----------------------------------------- not redux -------------------------------------

// import s from './CalendarItem.module.css';
// import clsx from 'clsx';
// import dayjs from 'dayjs';
// // import { useDispatch } from 'react-redux';
// // import { setWaterDay } from '../../../../../redux/dailyInfo/dailyInfoSlice';

// const CalendarItem = ({ day, selectedDate, onDateSelect, percent }) => {
//   // const dispatch = useDispatch();
//   const getFormattedDate = (selectedDate, day) => {
//     const date = new Date(selectedDate);
//     date.setDate(day);
//     // const waterDay = date.toISOString().split('T')[0];
//     // dispatch(setWaterDay(waterDay));
//     return dayjs(date).format('YYYY-MM-DD');
//   };

//   const handleClick = () => {
//     const formattedDate = getFormattedDate(selectedDate, day);
//     onDateSelect(formattedDate);
//   };

//   const isSelected = dayjs(selectedDate).date() === day;

//   return (
//     <div className={s.calendaritem}>
//       {' '}
//       <button
//         className={clsx(s.btnstyle, {
//           [s.selected]: isSelected,
//           [s.calendaritemfull]: percent >= 100,
//           [s.calendaritemhalf]: percent < 100,
//         })}
//         onClick={handleClick}
//       >
//         {' '}
//         <div className={clsx(s.day, { [s.selectedDay]: isSelected })}>
//           {day}{' '}
//         </div>{' '}
//         <div className={s.percentage}>
//           {' '}
//           <div className={s['percentage-value']}>
//             {' '}
//             {percent !== undefined ? percent.toFixed(0) : 0}%{' '}
//           </div>{' '}
//         </div>{' '}
//       </button>{' '}
//     </div>
//   );
// };
// export default CalendarItem;

// ----------------------------------------- not redux -------------------------------------

// import s from './CalendarItem.module.css';
// import clsx from 'clsx';
// import dayjs from 'dayjs';
// import { useDispatch } from 'react-redux';
// import { setWaterDay } from '../../../redux/water/slice';

// const CalendarItem = ({ day, selectedDate, onDateSelect, percent }) => {
//   const dispatch = useDispatch();
//   const getFormattedDate = (selectedDate, day) => {
//     const date = new Date(selectedDate);
//     date.setDate(day);
//     const waterDay = date.toISOString().split('T')[0];
//     dispatch(setWaterDay(waterDay));
//     return dayjs(date).format('YYYY-MM-DD');
//   };

//   const handleClick = () => {
//     const formattedDate = getFormattedDate(selectedDate, day);
//     onDateSelect(formattedDate);
//   };

//   const isSelected = dayjs(selectedDate).date() === day;

//   return (
//     <div className={s.calendaritem}>
//       {' '}
//       <button
//         className={clsx(s.btnstyle, {
//           [s.selected]: isSelected,
//           [s.calendaritemfull]: percent >= 100,
//           [s.calendaritemhalf]: percent < 100,
//         })}
//         onClick={handleClick}
//       >
//         {' '}
//         <div className={clsx(s.day, { [s.selectedDay]: isSelected })}>
//           {day}{' '}
//         </div>{' '}
//         <div className={s.percentage}>
//           {' '}
//           <div className={s['percentage-value']}>
//             {' '}
//             {percent !== undefined ? percent.toFixed(0) : 0}%{' '}
//           </div>{' '}
//         </div>{' '}
//       </button>{' '}
//     </div>
//   );
// };
// export default CalendarItem;
