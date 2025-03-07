import css from './WaterDailyNorma.module.css';
import { useSelector } from 'react-redux';
import { selectDailyNorm } from '../../../redux/auth/selectors.js';

export default function WaterDailyNorma() {
  const dailyNorm = useSelector(selectDailyNorm);

  return (
    <div className={css.container}>
      <p className={css.litr}>{dailyNorm / 1000} L</p>
      <p className={css.norma}>My daily norma</p>
    </div>
  );
}
