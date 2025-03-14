import { useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/operations';
import { useNavigate } from 'react-router-dom';
import styles from './LogOutModal.module.css';
import Modal from '../Modal/Modal';

const LogOutModal = ({ onClose }) => {
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
        <h2 className={styles.logoutTitle}>Log out</h2>
        <p className={styles.logoutText}>Do you really want to leave?</p>
        <div className={styles.btnLogoutWrapper}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Log out
          </button>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LogOutModal;
