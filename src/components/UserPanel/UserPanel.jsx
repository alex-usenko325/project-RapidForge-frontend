import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../redux/user/operations';
import { selectUser, selectIsRefreshing } from '../../redux/user/selectors';
import { Rings } from 'react-loader-spinner';
import styles from './UserPanel.module.css';
import UserBar from '../UserBar/UserBar';
import { useTranslation } from 'react-i18next';

const UserPanel = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsRefreshing);

  useEffect(() => {
    if (!user) {
      // Перевірка, чи є користувач і чи є ім'я
      dispatch(getUserData()); // Якщо ім'я користувача відсутнє, викликаємо запит
    }
  }, [dispatch, user]);

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <Rings visible={true} height="60" width="60" color="#9BE1A0" />
      </div>
    );
  }

  if (!user) {
    return <p>{t('userPanel.noUserData')}</p>;
  }

  // Визначаємо відображуване ім'я
  let userDisplayName =
    user.name || (user.email ? user.email.split('@')[0] : 'User');

  return (
    <div className={styles.userPanelCont}>
      <h2 className={styles.title}>
        {t('userPanel.hello')},
        <span className={styles.span}> {userDisplayName}!</span>
      </h2>
      <UserBar name={userDisplayName} avatar={user.avatar} />
    </div>
  );
};

export default UserPanel;
