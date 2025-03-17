import CalendarPagination from './CalendarPagination.jsx';
import Calendar from './Calendar/Calendar.jsx';
import { useState } from 'react';

const MonthInfo = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <div data-tour="step-8">
      <CalendarPagination
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
      />
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
    </div>
  );
};

export default MonthInfo;
