import AddWaterBtn from '../AddWaterBtn/AddWaterBtn.jsx';
import ChooseDate from '../ChooseDate/ChooseDate.jsx';
import WaterList from '../WaterList/WaterList.jsx';

const DailyInfo = () => {
  return (
    <div>
      <ChooseDate />
      <AddWaterBtn style="green" onclick="onclick" />
      <WaterList />
    </div>
  );
};

export default DailyInfo;
