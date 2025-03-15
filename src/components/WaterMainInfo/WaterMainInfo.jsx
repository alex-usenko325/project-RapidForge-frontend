import AddWaterBtn from './AddWaterBtn/AddWaterBtn';
import WaterDailyNorma from './WaterDailyNorma/WaterDailyNorma';
import WaterProgressBar from './WaterProgressBar/WaterProgressBar';
import css from './WaterMainInfo.module.css';
import Logo from '../Logo/Logo.jsx';
import LocalizationDropdownMenu from '../LocalizationDropdownMenu/LocalizationDropdownMenu.jsx';
export default function WaterMainInfo() {
  return (
    <div className={css.container}>
      <LocalizationDropdownMenu />
      <Logo />
      <WaterDailyNorma />
      <WaterProgressBar />
      <AddWaterBtn />
    </div>
  );
}
