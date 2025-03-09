import { useState } from 'react';
import s from './UserBarPopover.module.css';
import LogOutModal from '../LogOutModal/LogOutModal';
import UserSettingsModal from '../UserSettingsModal/UserSettingsModal';

const UserBarPopover = ({ onClose }) => {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isUserSettingsOpen, setIsUserSettingsOpen] = useState(false);

  const openLogout = () => {
    setIsLogoutOpen(true);
  };

  const closeLogout = () => {
    setIsLogoutOpen(false);
  };

  const openUserSettings = () => {
    setIsUserSettingsOpen(true);
  };

  const closeUserSettings = () => {
    setIsUserSettingsOpen(false);
  };

  return (
    <div className={s.userBar}>
      <button className={s.btn_settings} onClick={openUserSettings}>
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
      {isLogoutOpen && <LogOutModal onClose={closeLogout} />}
      {isUserSettingsOpen && <UserSettingsModal onClose={closeUserSettings} />}
    </div>
  );
};

export default UserBarPopover;
