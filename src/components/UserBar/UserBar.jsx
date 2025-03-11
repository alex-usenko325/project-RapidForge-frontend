// import { useEffect, useRef, useState } from 'react';
// import s from './UserBar.module.css';
// import UserBarPopover from '../UserBarPopover/UserBarPopover';
// import sprite from '../../assets/sprite.svg';

// const UserBar = ({ avatar, name }) => {
//   const [isPopoverOpen, setIsPopoverOpen] = useState(false);
//   const popoverRef = useRef(null);
//   const buttonRef = useRef(null);

//   const togglePopover = () => {
//     setIsPopoverOpen(prev => !prev);
//   };
//   // const userName = user.name ? user.name : user.email.split('@')[0].slice(0, 8);
//   const userName = user.name ? user.name : 'USER';

//   useEffect(() => {
//     const handleClickOutside = e => {
//       if (
//         popoverRef.current &&
//         !popoverRef.current.contains(e.target) &&
//         buttonRef.current &&
//         !buttonRef.current.contains(e.target)
//       ) {
//         setIsPopoverOpen(false);
//       }
//     };

//     if (isPopoverOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isPopoverOpen]);
//   return (
//     <div className={s.user_bar}>
//       <button className={s.btn} onClick={togglePopover} ref={buttonRef}>
//         <span className={s.name}>{userName}</span>
//         <img className={s.avatar} src={avatar} alt="user avatar" />
//         <svg className={s.icon} width="16" height="16">
//           <use
//             href={`${sprite}#${
//               isPopoverOpen ? 'icon-chevron-up' : 'icon-chevron-down'
//             }`}
//           ></use>
//         </svg>
//       </button>

//       {isPopoverOpen && (
//         <div ref={popoverRef}>
//           <UserBarPopover onClose={() => setIsPopoverOpen(false)} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserBar;
import { useEffect, useRef, useState } from 'react';
import s from './UserBar.module.css';
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import sprite from '../../assets/sprite.svg';

const UserBar = ({ avatar, name }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef(null);
  const buttonRef = useRef(null);

  const togglePopover = () => {
    setIsPopoverOpen(prev => !prev);
  };

  // Використовуємо передане ім'я, або 'USER' за замовчуванням
  const userName = name ? name : 'USER';

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
    <div className={s.user_bar}>
      <button className={s.btn} onClick={togglePopover} ref={buttonRef}>
        <span className={s.name}>{userName}</span>
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
          <UserBarPopover onClose={() => setIsPopoverOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default UserBar;
