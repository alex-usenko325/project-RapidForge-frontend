import s from './UserBarPopover.module.css';
import sprite from '../../assets/sprite.svg';

const UserBarPopover = ({ onClose, openUserSettings, openLogout, width }) => {
  return (
    <div className={s.userBar} style={{ width: `${width}px` }}>
      <button className={s.btn_settings} onClick={openUserSettings}>
        <svg className={s.icon_settings} width="16" height="16">
          <use xlinkHref={`${sprite}#icon-log-out`} />
        </svg>
        Settings
      </button>
      <button className={s.btn_logout} onClick={openLogout}>
        <svg className={s.icon_logout} width="16" height="16">
          <use xlinkHref={`${sprite}#icon-settings`} />
        </svg>
        Log out
      </button>
    </div>
  );
};

export default UserBarPopover;
