import s from './DeleteWaterModal.module.css';
import Modal from '../Modal/Modal';
import { useDispatch } from 'react-redux';
import { RotatingLines } from 'react-loader-spinner';
import { deleteWaterRecord } from '../../redux/water/operations';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const DeleteWaterModal = ({ onClose, waterEntryId }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (!waterEntryId) {
      toast.error(t('deleteWaterModal.error.noEntrySelected'));
      return;
    }
    setIsLoading(true);
    try {
      await dispatch(deleteWaterRecord(waterEntryId)).unwrap();
      onClose();
      toast.success(t('deleteWaterModal.success'));
    } catch (error) {
      toast.error(t('deleteWaterModal.error.deletionFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className={s.modal}>
        <div className={s.header_text}>
          <h3 className={s.header}>{t('deleteWaterModal.header')}</h3>
          <p className={s.text}>{t('deleteWaterModal.text')}</p>
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
                {t('deleteWaterModal.delete')}
              </button>
              <button className={s.btn_cancel} onClick={onClose}>
                {t('deleteWaterModal.cancel')}
              </button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default DeleteWaterModal;
