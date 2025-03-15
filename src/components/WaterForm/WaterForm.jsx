import { useEffect, useState } from 'react';
import Modal from '../Modal/Modal.jsx';
import s from './WaterForm.module.css';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

export default function WaterForm({ onClose }) {
  const { t } = useTranslation();
    const [waterAmount, setWaterAmount] = useState(50);
    const increaseWater = () => setWaterAmount(waterAmount + 50);
    const decreaseWater = () => setWaterAmount(waterAmount > 50 ? waterAmount - 50 : 50);

    const [CustomWaterAmount, setCustomWaterAmount] = useState(50);

    const [time, setTime] = useState('');

    const handleCustomWaterAmount = (e) => {
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

    return (
    <div>
      <Modal onClose={onClose} >
        <div className={s.wrapper}>
        <h2 className={s.title}>{t('waterModal.addWater')}</h2>
          <p className={s.subtitle}>{t('waterModal.chooseValue')}</p>
          <p className={s.amount}>{t('waterModal.amountWater')}</p>
           <div className={s.wrapperAmount}>
         
            <button type="button" className={clsx(s.btn, s.btnMinus)} onClick={decreaseWater}></button>

            {/* <p className={s.number}>{waterAmount} {t('waterModal.ml')}</p> */}
            <p className={s.number}>{waterAmount} ml</p>
            <button type="button" className={clsx(s.btn, s.btnPlus)} onClick= {increaseWater} disabled={waterAmount >= 5000}> </button>
          
          </div>
          <form className={s.form}>
            <label className={s.labelTime}>
            {t('waterModal.recordingTime')}
              <input
                type="time" value={time} onChange={(e) => setTime(e.target.value)} className={clsx(s.inputTime, s.input)} required/>
            </label>
            <label className={s.labelValueWater}>
               {t('waterModal.enterValue')}
               <input  type="number"   value={waterAmount}  onChange={handleCustomWaterAmount} min="0" className={clsx(s.inputValueWater, s.input)}/>
               
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








////////////










// !!!!BEFORE!!!!

// import Modal from '../Modal/Modal.jsx';
// import s from './WaterModal.module.css';
// import clsx from 'clsx';

// export default function WaterModal({ onClose }) {
//   return (
//     <div>
//       <Modal onClose={onClose}>
//         <div className={s.wrapper}>
//           <h2 className={s.title}>Add water</h2>
//           <p className={s.subtitle}>Choose a value</p>
//           <p className={s.amount}>Amount of water:</p>
//           <div className={s.wrapperAmount}>
//             <button type="button" className={clsx(s.btn, s.btnMinus)}></button>
//             <p className={s.number}>50 ml</p>
//             <button type="button" className={clsx(s.btn, s.btnPlus)}></button>
//           </div>
//           <form className={s.form}>
//             <label className={s.labelTime}>
//               Recording time:
//               <input
//                 type="text"
//                 placeholder="7:00"
//                 className={clsx(s.inputTime, s.input)}
//               />
//             </label>
//             <label className={s.labelValueWater}>
//               Enter the value of the water used:
//               <input
//                 type="number"
//                 placeholder="50"
//                 className={clsx(s.inputValueWater, s.input)}
//               />
//             </label>
//             <button type="button" className={s.btnSave}>
//               Save
//             </button>
//           </form>
//         </div>
//       </Modal>
//     </div>
//   );
// }








// import { useState } from 'react'


// export default function WaterForm() {
//     const [usedWater, setUsedWater] = useState(0)
   
//     return (
//       <>
//         <p> Edit the enter emout of water or ADD water</p>
//         <p> correct enterned data</p>
//         <p> amount of water </p>
//         <button onClick={() => setUsedWater((usedWater) => usedWater + 50)}> + </button>
//         <p> ${usedWater}+ml </p>
//         <button onClick={() => setUsedWater((usedWater) => usedWater - 50)}> + </button>

//         <p> Recording time</p>
//         <p>time</p>
//         <p>Enter the walue of the water used</p>
//         <p>${usedWater}</p>
//         <button type="submit">Save</button>
//      </>
//     );
//   }