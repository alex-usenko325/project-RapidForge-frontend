import { useSelector } from 'react-redux';
import { selectWaterIsLoading } from '../../redux/water/selectors.js';
import { RotatingLines } from 'react-loader-spinner';
import AddWaterBtn from '../AddWaterBtn/AddWaterBtn.jsx';
import ChooseDate from '../ChooseDate/ChooseDate.jsx';
import WaterList from '../WaterList/WaterList.jsx';
import s from './DailyInfo.module.css';

const DailyInfo = () => {
  const isLoading = useSelector(selectWaterIsLoading);
  return (
    <>
      <div className={`${s.topContainer} fifth-step`}>
        <ChooseDate />
        <AddWaterBtn style="green" />
      </div>
      <div className={s.bottomContainer}>
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
    </>
  );
};

export default DailyInfo;
