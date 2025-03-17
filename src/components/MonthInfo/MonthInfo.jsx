import CalendarPagination from './CalendarPagination.jsx';
import Calendar from './Calendar/Calendar.jsx';
import { useState } from 'react';
import WaterStatistics from '../WaterStatistics/WaterStatistics.jsx';

const MonthInfo = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isStatisticVisible, setIsStatisticVisible] = useState(false);

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const toggleStatistic = () => {
    setIsStatisticVisible(prev => !prev);
  };

  return (
    <div>
      <CalendarPagination
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
        isStatisticVisible={isStatisticVisible}
        toggleStatistic={toggleStatistic}
      />
      {isStatisticVisible ? (
        <WaterStatistics />
      ) : (
        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      )}
    </div>
  );
};

export default MonthInfo;
