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
      <LocalizationDropdownMenu />
      <button className={css.tourBtn} onClick={tourOn}>
        {t('onboardingTour.startTourBtn')}
      </button>

      <Logo />
      <WaterDailyNorma />
      <WaterProgressBar />
      <AddWaterBtn />
    </div>
  );
}
