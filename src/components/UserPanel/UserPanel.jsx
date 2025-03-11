// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getUserData } from '../../redux/auth/operations';
// import { selectUser, selectIsRefreshing } from '../../redux/auth/selectors';
// import { Rings } from 'react-loader-spinner';
// import styles from './UserPanel.module.css';
// import UserBar from '../UserBar/UserBar';

// const UserPanel = () => {
//   const dispatch = useDispatch();
//   const user = useSelector(selectUser);
//   const isLoading = useSelector(selectIsRefreshing);

//   useEffect(() => {
//     dispatch(getUserData());
//   }, [dispatch]);

//   if (isLoading) {
//     return (
//       <div className={styles.loader}>
//         <Rings visible={true} height="60" width="60" color="#9BE1A0" />
//       </div>
//     );
//   }

//   if (!user) {
//     return <p>No user data</p>;
//   }

//   // Отримуємо ім'я користувача або використовуємо 'USER', якщо ім'я не знайдено
//   const userName = user.name ? user.name : 'USER';

//   // Логуємо ім'я користувача
//   console.log('User name:', userName);

//   const userPhoto = user.avatar
//     ? user.avatar
//     : `https://www.gravatar.com/avatar/${user.email}?d=identicon`;

//   return (
//     <div className={styles.userPanelCont}>
//       <h2 className={styles.title}>
//         Hello, <span className={styles.span}>{userName}!</span>
//       </h2>
//       <UserBar name={userName} avatar={userPhoto} />
//     </div>
//   );
// };

// export default UserPanel;
import styles from './UserPanel.module.css';
import UserBar from '../UserBar/UserBar';

const UserPanel = ({ userName, userEmail, userAvatar }) => {
  // Перевіряємо, чи є ім'я, і якщо ні, використовуємо частину email до '@'
  const userDisplayName = userName
    ? userName
    : userEmail
    ? userEmail.split('@')[0]
    : 'USER';

  // Якщо аватар не передано, генеруємо його через Gravatar
  const userPhoto = userAvatar
    ? userAvatar
    : `https://www.gravatar.com/avatar/${userDisplayName}?d=identicon`;

  return (
    <div className={styles.userPanelCont}>
      <h2 className={styles.title}>
        Hello, <span className={styles.span}>{userDisplayName}!</span>
      </h2>
      {/* Додаємо UserBar для відображення імені та аватарки */}
      <UserBar name={userDisplayName} avatar={userPhoto} />
    </div>
  );
};

export default UserPanel;
