import Calendar from '../Calendar/Calendar.jsx';

import { useState } from 'react';
import CalendarPagination from '../CalendarPagination/CalendarPagination.jsx';

const MonthInfo = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <div>
      <CalendarPagination
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
      />
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
    </div>
  );
};

export default MonthInfo;
