import Modal from '../Modal/Modal.jsx';
import s from './WaterModal.module.css';
import clsx from 'clsx';

export default function WaterModal({ onClose }) {
  return (
    <div>
      <Modal onClose={onClose}>
        <div className={s.wrapper}>
          <h2 className={s.title}>Add water</h2>
          <p className={s.subtitle}>Choose a value</p>
          <p className={s.amount}>Amount of water:</p>
          <div className={s.wrapperAmount}>
            <button type="button" className={clsx(s.btn, s.btnMinus)}></button>
            <p className={s.number}>50ml</p>
            <button type="button" className={clsx(s.btn, s.btnPlus)}></button>
          </div>
          <form className={s.form}>
            <label className={s.labelTime}>
              Recording time:
              <input
                type="text"
                placeholder="7:00"
                className={clsx(s.inputTime, s.input)}
              />
            </label>
            <label className={s.labelValueWater}>
              Enter the value of the water used:
              <input
                type="number"
                placeholder="50"
                className={clsx(s.inputValueWater, s.input)}
              />
            </label>
            <button type="button" className={s.btnSave}>
              Save
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
