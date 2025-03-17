import WaterDailyNorma from './WaterDailyNorma/WaterDailyNorma';
import WaterProgressBar from './WaterProgressBar/WaterProgressBar';
import css from './WaterMainInfo.module.css';
import Logo from '../Logo/Logo.jsx';
import LocalizationDropdownMenu from '../LocalizationDropdownMenu/LocalizationDropdownMenu.jsx';
import AddWaterBtn from '../../components/AddWaterBtn/AddWaterBtn.jsx';

export default function WaterMainInfo() {
  return (
    <div className={css.container} data-tour="step-2">
      <LocalizationDropdownMenu />
      <Logo />
      <WaterDailyNorma />
      <WaterProgressBar />
      <AddWaterBtn />
    </div>
  );
}
