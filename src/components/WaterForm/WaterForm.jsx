import { useEffect, useState } from 'react';
import s from './WaterForm.module.css';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  addWaterRecord,
  updateWaterRecord,
} from '../../redux/water/operations';
import { selectSelectedDate, selectWaterIsLoading } from '../../redux/water/selectors';
import toast from 'react-hot-toast';

export default function WaterForm({
  closeAddWaterModal,
  modalType,
  waterEntryId,
}) {

  const selectedDate = useSelector(selectSelectedDate)
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectWaterIsLoading);
  const [waterAmount, setWaterAmount] = useState(50);
  const [time, setTime] = useState('');

  const increaseWater = () => setWaterAmount(waterAmount + 50);
  const decreaseWater = () =>
    setWaterAmount(waterAmount > 50 ? waterAmount - 50 : 50);

  useEffect(() => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    setTime(`${hours}:${minutes}`);
  }, []);

  const handleCustomWaterAmount = e => {
    const value = Math.max(0, Math.min(5000, parseInt(e.target.value) || 0));
    setWaterAmount(value);
  };

  const handleBlurTime = () => {
    if (!time || time === '--:--') {
      toast.error(t('waterModal.editErrorNotValid'));
      setTime('');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!time || time === '--:--') {
      toast.error(t('waterModal.editErrorRecordingTime'));
      return;
    }

    if (waterAmount === '' || waterAmount < 50 || waterAmount > 5000) {
      toast.error(t('waterModal.editErrorWaterAmount'));
      return;
    }

    const record = {
      date: selectedDate,
      volume: waterAmount,
      time: time,
    };

    try {
      if (modalType === 'edit') {
        await dispatch(
          updateWaterRecord({ id: waterEntryId, updatedData: record })
        ).unwrap();
        toast.success(t('waterModal.editSuccessMessage'));
      } else {
        await dispatch(addWaterRecord(record)).unwrap();
        toast.success(t('waterModal.successMessage'));
      }
      closeAddWaterModal();
    } catch (error) {
      if (modalType === 'edit' && error.message.includes('not found')) {
        toast.error(t('waterModal.editErrorMessage'));
      } else {
        toast.error(t('waterModal.errorMessage'));
      }
    }
  };

  return (
    <>
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
            autoComplete="off"
            onInvalid={e => e.preventDefault()}
            onBlur={handleBlurTime}
          />
        </label>
        <label className={s.labelValueWater}>
          {t('waterModal.enterValue')}
          <input
            type="number"
            value={waterAmount}
            onChange={handleCustomWaterAmount}
            min="0"
            max="5000"
            className={clsx(s.inputValueWater, s.input)}
            autoComplete="off"
          />
        </label>
        <button type="submit" className={s.btnSave} disabled={isLoading}>
          {t('waterModal.save')}
        </button>
      </form>
    </>
  );
}
