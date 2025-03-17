import Modal from '../Modal/Modal';
import WaterForm from '../WaterForm/WaterForm';
import { useTranslation } from 'react-i18next';
import s from '../WaterForm/WaterForm.module.css';

export default function WaterModal({
  closeAddWaterModal,
  modalType,
  waterEntryId,
}) {
  const { t } = useTranslation();

  return (
    <Modal onClose={closeAddWaterModal}>
      <div className={s.wrapper}>
        {modalType === 'edit' ? (
          <>
            <h2 className={s.title}>{t('waterModal.editTheEntered')}</h2>
            <p className={s.subtitle}>{t('waterModal.correctEnteredData')}</p>
          </>
        ) : (
          <>
            <h2 className={s.title}>{t('waterModal.addWater')}</h2>
            <p className={s.subtitle}>{t('waterModal.chooseValue')}</p>
          </>
        )}

        <WaterForm
          closeAddWaterModal={closeAddWaterModal}
          modalType={modalType}
          waterEntryId={waterEntryId}
        />
      </div>
    </Modal>
  );
}
