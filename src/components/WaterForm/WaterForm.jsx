import { useEffect, useState } from 'react';
import Modal from '../Modal/Modal.jsx';
import s from './WaterForm.module.css';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { addWaterRecord } from '../../redux/water/operations'; // Імпортуємо функцію addWaterRecord

export default function WaterForm({ onClose }) {
  const { t } = useTranslation();
  const dispatch = useDispatch(); // Використовуємо useDispatch для dispatch-у action
  const [waterAmount, setWaterAmount] = useState(50);
  const increaseWater = () => setWaterAmount(waterAmount + 50);
  const decreaseWater = () =>
    setWaterAmount(waterAmount > 50 ? waterAmount - 50 : 50);

  const [CustomWaterAmount, setCustomWaterAmount] = useState(50);
  const [time, setTime] = useState('');

  const handleCustomWaterAmount = e => {
    const value = Math.max(0, parseInt(e.target.value) || 0);
    setCustomWaterAmount(value);
    setWaterAmount(value);
  };

  // Встановлення початкового часу при завантаженні
  useEffect(() => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    setTime(`${hours}:${minutes}`);
  }, []);

  // Обробник для відправки даних
  const handleSubmit = e => {
    e.preventDefault();

    // Створюємо запис для води
    const record = {
      date: new Date().toISOString().split('T')[0], // Поточна дата у форматі "YYYY-MM-DD"
      volume: waterAmount,
      time: time,
    };

    // Викликаємо dispatch для збереження запису
    dispatch(addWaterRecord(record));

    // Закриваємо модальне вікно після збереження
    onClose();
  };

  return (
    <div>
      <Modal onClose={onClose}>
        <div className={s.wrapper}>
          <h2 className={s.title}>{t('waterModal.addWater')}</h2>
          <p className={s.subtitle}>{t('waterModal.chooseValue')}</p>
          <p className={s.amount}>{t('waterModal.amountWater')}</p>
          <div className={s.wrapperAmount}>
            <button
              type="button"
              className={clsx(s.btn, s.btnMinus)}
              onClick={decreaseWater}
            ></button>

            <p className={s.number}>{waterAmount} ml</p>
            <button
              type="button"
              className={clsx(s.btn, s.btnPlus)}
              onClick={increaseWater}
              disabled={waterAmount >= 5000}
            ></button>
          </div>
          <form className={s.form} onSubmit={handleSubmit}>
            <label className={s.labelTime}>
              {t('waterModal.recordingTime')}
              <input
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                className={clsx(s.inputTime, s.input)}
                required
              />
            </label>
            <label className={s.labelValueWater}>
              {t('waterModal.enterValue')}
              <input
                type="number"
                value={waterAmount}
                onChange={handleCustomWaterAmount}
                min="0"
                className={clsx(s.inputValueWater, s.input)}
              />
            </label>
            <button type="submit" className={s.btnSave}>
              {t('waterModal.save')}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
