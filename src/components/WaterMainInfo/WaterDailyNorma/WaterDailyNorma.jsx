import css from './WaterDailyNorma.module.css';
import { useSelector } from 'react-redux';
import { selectDailyNorm } from '../../../redux/user/selectors.js';
import { useTranslation } from 'react-i18next';
export default function WaterDailyNorma() {
  const { t } = useTranslation();
  const dailyNorm = useSelector(selectDailyNorm);

  return (
    <div className={`${css.container} first-step`}>
      <p className={css.litr}>
        {dailyNorm / 1000} {t('waterDailyNorma.liters')}
      </p>
      <p className={css.norma}>{t('waterDailyNorma.dailyNorma')}</p>
    </div>
  );
}
