import { useEffect, useRef, useState } from 'react';
import s from './UserBar.module.css';
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import sprite from '../../assets/sprite.svg';
import LogOutModal from '../LogOutModal/LogOutModal';
import UserSettingsModal from '../UserSettingsModal/UserSettingsModal';

const UserBar = ({ avatar, name }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isUserSettingsOpen, setIsUserSettingsOpen] = useState(false);
  const [userBarWidth, setUserBarWidth] = useState(null);

  useEffect(() => {
    if (buttonRef.current) {
      setUserBarWidth(buttonRef.current.offsetWidth);
    }
  }, [isPopoverOpen]);

  const popoverRef = useRef(null);
  const buttonRef = useRef(null);

  const togglePopover = () => {
    setIsPopoverOpen(prev => !prev);
  };

  const openLogout = () => {
    setIsLogoutOpen(true);
    setIsPopoverOpen(false);
  };

  const closeLogout = () => {
    setIsLogoutOpen(false);
  };

  const openUserSettings = () => {
    setIsUserSettingsOpen(true);
    setIsPopoverOpen(false);
  };

  const closeUserSettings = () => {
    setIsUserSettingsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = e => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsPopoverOpen(false);
      }
    };

    if (isPopoverOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopoverOpen]);

  return (
    <div className={`${s.user_bar} fourth-step`}>
      <button className={s.btn} onClick={togglePopover} ref={buttonRef}>
        <span className={s.name}>{name}</span>
        <img className={s.avatar} src={avatar} alt="user avatar" />
        <svg className={s.icon} width="16" height="16">
          <use
            href={`${sprite}#${
              isPopoverOpen ? 'icon-chevron-up' : 'icon-chevron-down'
            }`}
          ></use>
        </svg>
      </button>

      {isPopoverOpen && (
        <div ref={popoverRef}>
          <UserBarPopover
            onClose={() => setIsPopoverOpen(false)}
            openUserSettings={openUserSettings}
            openLogout={openLogout}
            width={userBarWidth}
          />
        </div>
      )}
      {isLogoutOpen && <LogOutModal onClose={closeLogout} />}
      {isUserSettingsOpen && <UserSettingsModal onClose={closeUserSettings} />}
    </div>
  );
};

export default UserBar;
