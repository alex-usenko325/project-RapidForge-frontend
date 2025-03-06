import s from './AddWaterBtn.module.css';

const AddWaterBtn = () => {
  return (
    <button className={s.btn}>
      <span className={s.icon}></span>Add water
    </button>
  );
};

export default AddWaterBtn;
