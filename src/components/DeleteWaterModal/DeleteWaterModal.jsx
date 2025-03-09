import s from './DeleteWaterModal.module.css';
import sprite from '../../assets/sprite.svg';

const DeleteWaterModal = () => {
  return (
    <div className={s.overlay}>
      <div className={s.modal}>
        <use xlinkHref={`${sprite}#icon-close`} />
        <div className={s.header_text}>
          <h3 className={s.header}>Delete entry</h3>
          <p className={s.text}>Are you sure you want to delete the entry?</p>
        </div>
        <div className={s.buttons}>
          <button className={s.btn_delete}>Delete</button>
          <button className={s.btn_cancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteWaterModal;
