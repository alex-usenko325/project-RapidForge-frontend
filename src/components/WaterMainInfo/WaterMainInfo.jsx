import AddWaterBtn from './AddWaterBtn/AddWaterBtn';
import WaterDailyNorma from './WaterDailyNorma/WaterDailyNorma';
import WaterProgressBar from './WaterProgressBar/WaterProgressBar';
import css from './WaterMainInfo.module.css';

export default function WaterMainInfo() {
  return (
    <div className={css.container}>
      <h2 className={css.trackH2}>AquaTrack</h2>
      <WaterDailyNorma />
      <WaterProgressBar />
      <AddWaterBtn />
    </div>
  );
}
