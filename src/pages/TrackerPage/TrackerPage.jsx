import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import css from './TrackerPage.module.css';
import clsx from 'clsx';

export default function TrackerPage() {
  return (
    <div className={clsx('container', css.container)}>
      <WaterMainInfo />
      <WaterDetailedInfo />
    </div>
  );
}
