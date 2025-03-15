import s from './UserBarPopover.module.css';
import { useTranslation } from 'react-i18next';
const UserBarPopover = ({ onClose, openUserSettings, openLogout }) => {
  const { t } = useTranslation();

  return (
    <div className={s.userBar}>
      <button className={s.btn_settings} onClick={openUserSettings}>
        <svg className={s.icon_settings} width="16" height="16">
          <use href="./sprite.svg#icon-settings"></use>
        </svg>
        {t('userBarPopover.settings')}
      </button>
      <button className={s.btn_logout} onClick={openLogout}>
        <svg className={s.icon_logout} width="16" height="16">
          <use href="./sprite.svg#icon-log-out"></use>
        </svg>
        {t('userBarPopover.logout')}
      </button>
    </div>
  );
};

export default UserBarPopover;
