import WaterDailyNorma from './WaterDailyNorma/WaterDailyNorma';
import WaterProgressBar from './WaterProgressBar/WaterProgressBar';
import css from './WaterMainInfo.module.css';
import Logo from '../Logo/Logo.jsx';
import LocalizationDropdownMenu from '../LocalizationDropdownMenu/LocalizationDropdownMenu.jsx';
import AddWaterBtn from '../../components/AddWaterBtn/AddWaterBtn.jsx';
import { useTranslation } from 'react-i18next';

export default function WaterMainInfo({ tourOn }) {
  const { t } = useTranslation();

  return (
    <div className={css.container}>
      <Logo />
      <div className={css.logoWrap}>
        <button className={css.tourBtn} onClick={tourOn}>
          {t('onboardingTour.startTourBtn')}
        </button>
        <LocalizationDropdownMenu />
      </div>
      <WaterDailyNorma />
      <WaterProgressBar />
      <AddWaterBtn />
    </div>
  );
}
