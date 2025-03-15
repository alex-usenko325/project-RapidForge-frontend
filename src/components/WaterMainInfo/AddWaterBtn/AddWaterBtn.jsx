import css from './AddWaterBtn.module.css';
import { useState } from 'react';
import WaterModal from '../../WaterModal/WaterModal';
import { useTranslation } from 'react-i18next';
export default function AddWaterBtn() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    if (!isModalOpen) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    // <>
    //   <button className={css.button}>
    //     <span className={css.plus}>+</span> Add water
    //   </button>
    // </>
    <>
      <button className={css.button} onClick={handleClick}>
        <span className={css.plus}>+</span> {t('addWaterTracker.addWater')}
      </button>
      {isModalOpen && <WaterModal onClose={handleCloseModal} />}
    </>
  );
}
