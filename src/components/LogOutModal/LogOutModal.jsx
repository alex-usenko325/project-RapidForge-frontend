import { useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/operations';
import { useNavigate } from 'react-router-dom';
import styles from './LogOutModal.module.css';
import Modal from '../Modal/Modal';
import { useTranslation } from 'react-i18next';
const LogOutModal = ({ onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    localStorage.clear();
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
            {t('logOutModal.logoutButton')}
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
