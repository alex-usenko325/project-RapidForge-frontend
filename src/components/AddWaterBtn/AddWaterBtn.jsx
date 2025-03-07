import { useState } from 'react';
import WaterModal from '../WaterModal/WaterModal';
import s from './AddWaterBtn.module.css';

const AddWaterBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickOpenWaterModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button className={s.addWaterBtn} onClick={handleClickOpenWaterModal}>
        <span className={s.plus}></span>Add water
      </button>
      {isModalOpen && <WaterModal />}
    </>
  );
};

export default AddWaterBtn;
