import UserPanel from '../UserPanel/UserPanel.jsx';
import DailyInfo from '../DailyInfo/DailyInfo.jsx';
import styles from './WaterDetailedInfo.module.css';
import WaterStatistic from '../WaterStatistics/WaterStatistics.jsx';

const WaterDetailedInfo = () => {
  return (
    <div className={styles.wrapper}>
      <UserPanel />
      <DailyInfo />
      <WaterStatistic />
    </div>
  );
};

export default WaterDetailedInfo;
