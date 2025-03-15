import { useState } from 'react';
import WaterModal from '../WaterModal/WaterModal';
import s from './AddWaterBtn.module.css';
import { useTranslation } from 'react-i18next';

const AddWaterBtn = ({ style }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickOpenWaterModal = () => {
    setIsModalOpen(true);
  };
  const { t } = useTranslation();
  return (
    <>
      <button
        className={style === 'green' ? s.addWaterBtn : s.btn}
        onClick={handleClickOpenWaterModal}
      >
        <span className={style === 'green' ? s.plus : s.icon}></span>
        {t('addWaterBtn.addWater')}
      </button>
      {isModalOpen && <WaterModal />}
    </>
  );
};

export default AddWaterBtn;
