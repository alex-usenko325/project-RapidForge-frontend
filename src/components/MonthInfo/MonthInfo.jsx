import { useState } from 'react';
import CalendarPagination from './CalendarPagination.jsx';
import WaterStatistics from '../WaterStatistics/WaterStatistics.jsx';
import Calendar from './Calendar/Calendar.jsx';

const MonthInfo = () => {
  const [isStatisticVisible, setIsStatisticVisible] = useState(false);

  const toggleStatistic = () => {
    setIsStatisticVisible(prev => !prev);
  };

  return (
    <div className="sixth-step">
      <CalendarPagination
        isStatisticVisible={isStatisticVisible}
        toggleStatistic={toggleStatistic}
      />
      {isStatisticVisible ? <WaterStatistics /> : <Calendar />}
    </div>
  );
};

export default MonthInfo;
