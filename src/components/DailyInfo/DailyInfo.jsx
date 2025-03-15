import { useSelector } from 'react-redux';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn.jsx';
import ChooseDate from '../ChooseDate/ChooseDate.jsx';
import WaterList from '../WaterList/WaterList.jsx';
import s from './DailyInfo.module.css';
import { selectWaterIsLoading } from '../../redux/water/selectors.js';
import { RotatingLines } from 'react-loader-spinner';

const DailyInfo = () => {
  const isLoading = useSelector(selectWaterIsLoading);
  return (
    <div>
      <div className={s.topContainer}>
        <ChooseDate />
        <AddWaterBtn style="green" />
      </div>

      {isLoading ? (
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      ) : (
        <WaterList />
      )}
    </div>
  );
};

export default DailyInfo;
