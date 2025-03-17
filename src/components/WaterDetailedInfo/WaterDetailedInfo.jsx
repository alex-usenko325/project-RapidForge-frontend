import UserPanel from '../UserPanel/UserPanel.jsx';
import DailyInfo from '../DailyInfo/DailyInfo.jsx';
import MonthInfo from '../MonthInfo/MonthInfo.jsx';
import styles from './WaterDetailedInfo.module.css';

const WaterDetailedInfo = () => {
  return (
    <div className={styles.wrapper} data-tour="step-7">
      <UserPanel />
      <DailyInfo />
      <MonthInfo />
    </div>
  );
};

export default WaterDetailedInfo;
