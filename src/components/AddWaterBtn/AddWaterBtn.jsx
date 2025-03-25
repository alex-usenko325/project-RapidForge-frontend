import { useState } from 'react';
import WaterModal from '../WaterModal/WaterModal';
import s from './AddWaterBtn.module.css';
import { useTranslation } from 'react-i18next';

const AddWaterBtn = ({ style }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const handleClickOpenWaterModal = type => {
    setModalType(type);
    setIsModalOpen(true);
  };
  const closeAddWaterModal = () => {
    setIsModalOpen(false);
  };

  const { t } = useTranslation();

  return (
    <>
      <button
        className={`${style === 'green' ? s.addWaterBtn : s.btn} third-step`}
        onClick={() => handleClickOpenWaterModal('add')}
      >
        <span className={style === 'green' ? s.plus : s.icon}></span>
        {t('addWaterBtn.addWater')}
      </button>
      {isModalOpen && (
        <WaterModal
          modalType={modalType}
          closeAddWaterModal={closeAddWaterModal}
        />
      )}
    </>
  );
};

export default AddWaterBtn;
