import s from './DeleteWaterModal.module.css';
import sprite from '../../assets/sprite.svg';
import { useEffect } from 'react';

const DeleteWaterModal = ({ onClose }) => {
  const handleCloseDeleteModal = () => {
    onClose();
  };
  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      handleCloseDeleteModal();
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      handleCloseModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={s.overlay} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <button className={s.btn_close} onClick={handleCloseDeleteModal}>
          <svg className={s.icon} width="24" height="24">
            <use href={`${sprite}#icon-close`} />
          </svg>
        </button>
        <div className={s.header_text}>
          <h3 className={s.header}>Delete entry</h3>
          <p className={s.text}>Are you sure you want to delete the entry?</p>
        </div>
        <div className={s.buttons}>
          <button className={s.btn_delete}>Delete</button>
          <button className={s.btn_cancel} onClick={handleCloseDeleteModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteWaterModal;
