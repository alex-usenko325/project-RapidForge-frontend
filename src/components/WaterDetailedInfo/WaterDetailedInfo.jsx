import UserPanel from '../UserPanel/UserPanel.jsx';
import DailyInfo from '../DailyInfo/DailyInfo.jsx';
// import MonthInfo from '../MonthInfo/MonthInfo.jsx';
import styles from './WaterDetailedInfo.module.css';
import WaterStatistic from '../WaterStatistics/WaterStatistics.jsx';

const WaterDetailedInfo = () => {
  return (
    <div className={styles.wrapper}>
      <UserPanel />
      <DailyInfo />
      {/* <MonthInfo /> */}
      <WaterStatistic />
    </div>
  );
};

export default WaterDetailedInfo;
