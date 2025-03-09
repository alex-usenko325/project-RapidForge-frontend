import s from './DeleteWaterModal.module.css';

const DeleteWaterModal = () => {
  return (
    <div className={s.overlay}>
      <div className={s.modal}>
        <h3 className={s.header}>Delete entry</h3>
        <p className={s.text}>Are you sure you want to delete the entry?</p>
        <button className={s.btn_delete}>Delete</button>
        <button className={s.btn_cancel}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteWaterModal;
