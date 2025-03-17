import { useTranslation } from 'react-i18next';
import css from './WaterItem.module.css';
import sprite from '../../assets/sprite.svg';
import WaterModal from '../WaterModal/WaterModal.jsx';
import { useState } from 'react';
import DeleteWaterModal from '../DeleteWaterModal/DeleteWaterModal.jsx';

const WaterItem = ({ id, volume, time }) => {
  const { t } = useTranslation();
  const [isWaterModalOpen, setIsWaterModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const handleClickOpenWaterModal = type => {
    setModalType(type);
    setIsWaterModalOpen(true);
  };
  const closeWaterModal = () => {
    setIsWaterModalOpen(false);
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleClickOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className={css.waterItem}>
      <div>
        <svg className={css.waterIcon}>
          <use href={`${sprite}#icon-glass`} />
        </svg>
      </div>
      <div className={css.waterInfo}>
        <p className={css.volume}>{t('waterItem.volume', { volume })}</p>
        <p className={css.time}>{t('waterItem.time', { time })}</p>
      </div>
      <div className={css.waterButtons}>
        <button
          type="button"
          className={css.waterButton}
          onClick={() => handleClickOpenWaterModal('edit')}
        >
          <svg className={css.editBtn}>
            <use href={`${sprite}#icon-edit`} />
          </svg>
        </button>
        <button
          type="button"
          className={css.waterButton}
          onClick={handleClickOpenDeleteModal}
        >
          <svg className={css.removeBtn}>
            <use href={`${sprite}#icon-trash`} />
          </svg>
        </button>
        {isWaterModalOpen && (
          <WaterModal
            modalType={modalType}
            closeAddWaterModal={closeWaterModal}
            waterEntryId={id}
          />
        )}
        {isDeleteModalOpen && (
          <DeleteWaterModal onClose={closeDeleteModal} waterEntryId={id} />
        )}
      </div>
    </div>
  );
};

export default WaterItem;
