import Modal from '../Modal/Modal.jsx';
import s from './WaterModal.module.css';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

export default function WaterModal({title, subtitle, onClose }) {
  const { t } = useTranslation();

  return (
    <Modal onClose={onClose}>
      <div className={s.wrapper}>
        <h2 className={s.title}>{t(`waterModal.${title}`)}</h2>
        <p className={s.subtitle}>{t(`waterModal.${subtitle}`)}</p>
        <p className={s.amount}>{t('waterModal.amountWater')}</p>
        <div className={s.wrapperAmount}>
          <button type="button" className={clsx(s.btn, s.btnMinus)}></button>
          <p className={s.number}>50 {t('waterModal.ml')}</p>
          <button type="button" className={clsx(s.btn, s.btnPlus)}></button>
        </div>
        <form className={s.form}>
          <label className={s.labelTime}>
            {t('waterModal.recordingTime')}
            <input
              type="text"
              placeholder="7:00"
              className={clsx(s.inputTime, s.input)}
            />
          </label>
          <label className={s.labelValueWater}>
            {t('waterModal.enterValue')}
            <input
              type="number"
              placeholder="50"
              className={clsx(s.inputValueWater, s.input)}
            />
          </label>
          <button type="button" className={s.btnSave}>
            {t('waterModal.save')}
          </button>
        </form>
      </div>
    </Modal>
  );
}
