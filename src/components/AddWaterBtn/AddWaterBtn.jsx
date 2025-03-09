import { useState } from 'react';
import WaterModal from '../WaterModal/WaterModal';
import s from './AddWaterBtn.module.css';

const AddWaterBtn = ({ style }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickOpenWaterModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        className={style === 'green' ? s.addWaterBtn : s.btn}
        onClick={handleClickOpenWaterModal}
      >
        <span className={style === 'green' ? s.plus : s.icon}></span>Add water
      </button>
      {isModalOpen && <WaterModal />}
    </>
  );
};

export default AddWaterBtn;
