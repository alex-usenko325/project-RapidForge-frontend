import { useState } from 'react';
import s from './UserBar.module.css';
import UserBarPopover from '../UserBarPopover/UserBarPopover';

const UserBar = ({ avatar }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const togglePopover = () => {
    setIsPopoverOpen(prev => !prev);
  };
  // const userName = user.name ? user.name : user.email.split('@')[0].slice(0, 8);

  return (
    <div className={s.user_bar}>
      <button className={s.btn} onClick={togglePopover}>
        <span className={s.name}>Nadia</span>
        <img className={s.avatar} src={avatar} alt="user avatar" />
        <svg className={s.icon} width="16" height="16">
          <use
            href={`./sprite.svg#${
              isPopoverOpen ? 'icon-chevron-up' : 'icon-chevron-down'
            }`}
          ></use>
        </svg>
      </button>

      {isPopoverOpen && <UserBarPopover onClose={togglePopover} />}
    </div>
  );
};

export default UserBar;
