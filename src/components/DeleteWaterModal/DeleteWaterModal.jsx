import s from './DeleteWaterModal.module.css';
import Modal from '../Modal/Modal';

const DeleteWaterModal = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <div className={s.modal}>
        <div className={s.header_text}>
          <h3 className={s.header}>Delete entry</h3>
          <p className={s.text}>Are you sure you want to delete the entry?</p>
        </div>
        <div className={s.buttons}>
          <button className={s.btn_delete}>Delete</button>
          <button className={s.btn_cancel} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteWaterModal;
