import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { logout } from '../../redux/auth/operations';
import { useNavigate } from 'react-router-dom';
import styles from './LogOutModal.module.css';
import Modal from '../Modal/Modal';
import { useTranslation } from 'react-i18next';
import { RotatingLines } from 'react-loader-spinner';

const LogOutModal = ({ onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true); // Встановлюємо isLoading у true перед початком реєстрації
    await dispatch(logout());
    localStorage.clear();
    setIsLoading(false);
    onClose();
    navigate('/');
  };

  return (
    <Modal onClose={onClose}>
      <div
        className={styles.modalWrapper}
        role="dialog"
        aria-labelledby="logout-title"
      >
        <h2 className={styles.logoutTitle}>{t('logOutModal.logout')}</h2>
        <p className={styles.logoutText}>{t('logOutModal.leaveMessage')}</p>
        <div className={styles.btnLogoutWrapper}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            {isLoading ? (
              <RotatingLines
                visible={true}
                height="16"
                width="16"
                color="white"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
              />
            ) : (
              t('logOutModal.logoutButton')
            )}
          </button>
          <button className={styles.cancelBtn} onClick={onClose}>
            {t('logOutModal.cancelButton')}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LogOutModal;
