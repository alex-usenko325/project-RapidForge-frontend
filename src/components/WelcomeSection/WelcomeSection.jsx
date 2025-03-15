import s from './WelcomeSection.module.css';
import Logo from '../Logo/Logo.jsx';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LocalizationDropdownMenu from '../LocalizationDropdownMenu/LocalizationDropdownMenu.jsx';
const WelcomeSection = () => {
  const { t } = useTranslation();
  return (
    <div className={s.wrapper}>
      <Logo />
      <LocalizationDropdownMenu />
      <div className={s.wrapperContent}>
        <p className={s.subtitle}>{t('welcomeSection.subtitle')}</p>
        <h1 className={s.title}>{t('welcomeSection.title')}</h1>
      </div>
      <div className={s.btnWrapper}>
        <Link to="/signup" className={s.btnTracker}>
          {t('welcomeSection.tryTracker')}
        </Link>
        <Link to="/signin" className={s.btnSignIn}>
          {t('welcomeSection.signIn')}
        </Link>
      </div>
    </div>
  );
};

export default WelcomeSection;
