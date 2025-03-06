import { useState } from 'react';
import s from './AddWaterBtn.module.css';
import WaterModal from '../WaterModal/WaterModal';

const AddWaterBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenWaterModal = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      <button className={s.btn} onClick={handleOpenWaterModal}>
        <span className={s.icon}></span>Add water
      </button>
      {isModalOpen && <WaterModal />}
    </>
  );
};

export default AddWaterBtn;
