import s from './DeleteWaterModal.module.css';
import Modal from '../Modal/Modal';
import { useDispatch } from 'react-redux';
import { RotatingLines } from 'react-loader-spinner';
import { deleteWaterRecord } from '../../redux/water/operations';
import { useState } from 'react';
import toast from 'react-hot-toast';

const DeleteWaterModal = ({ onClose, waterEntryId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (!waterEntryId) {
      toast.error('No entry selected for deletion');
      return;
    }
    setIsLoading(true);

    try {
      await dispatch(deleteWaterRecord(waterEntryId)).unwrap();
      onClose();
      toast.success('Entry deleted successfully');
    } catch (error) {
      toast.error('Error deleting entry');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className={s.modal}>
        <div className={s.header_text}>
          <h3 className={s.header}>Delete entry</h3>
          <p className={s.text}>Are you sure you want to delete the entry?</p>
        </div>
        <div className={s.buttons}>
          {isLoading ? (
            <div className={s.spinner}>
              <RotatingLines
                visible={true}
                height="40"
                width="40"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
              />
            </div>
          ) : (
            <>
              <button className={s.btn_delete} onClick={handleDelete}>
                Delete
              </button>
              <button className={s.btn_cancel} onClick={onClose}>
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default DeleteWaterModal;
