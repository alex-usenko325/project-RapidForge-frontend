import { useState } from 'react';
import s from './UserBarPopover.module.css';
import LogOutModal from '../LogOutModal/LogOutModal';

const UserBarPopover = () => {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const openLogout = () => {
    setIsLogoutOpen(true);
  };

  return (
    <div className={s.userBar}>
      <button className={s.btn_settings}>
        <svg className={s.icon_settings} width="16" height="16">
          <use href="./sprite.svg#icon-settings"></use>
        </svg>
        Setting
      </button>
      <button className={s.btn_logout} onClick={openLogout}>
        <svg className={s.icon_logout} width="16" height="16">
          <use href="./sprite.svg#icon-log-out"></use>
        </svg>
        Log out
      </button>
      {isLogoutOpen && <LogOutModal />}
    </div>
  );
};

export default UserBarPopover;
