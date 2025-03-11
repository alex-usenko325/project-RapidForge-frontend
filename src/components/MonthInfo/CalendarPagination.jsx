import dayjs from "dayjs";
import s from "./CalendarPagination.module.css";

const CalendarPagination = ({ selectedDate, onDateChange }) => {
  const handlePreviousMonth = () => {
    onDateChange(dayjs(selectedDate).subtract(1, "month").toDate());
  };

  const handleNextMonth = () => {
    onDateChange(dayjs(selectedDate).add(1, "month").toDate());
  };

  return (
    <div className={s.calendarpagination}>
      <div>
        <h1 className={s.month}>Month</h1>
      </div>
      <div className={s.pagination}>
        <svg className={s.btnpagination} onClick={handlePreviousMonth}>
          <use href="sprite.svg#icon-chevron-left"></use>
        </svg>

        <span className={s.spanmonth}>
          {dayjs(selectedDate).format("MMMM, YYYY")}
        </span>
        <svg className={s.btnpagination} onClick={handleNextMonth}>
          <use href="sprite.svg#icon-chevron-right"></use>
        </svg>

        <svg className={s.iconpie}>
          <use href="sprite.svg#icon-pie-chart"></use>
        </svg>
      </div>
    </div>
  );
};

export default CalendarPagination;
