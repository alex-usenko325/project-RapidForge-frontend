import { useTranslation } from 'react-i18next';
import css from './WaterItem.module.css';
import sprite from '../../assets/sprite.svg';

const WaterItem = ({
  volume,
  time,
}) => {
  const { t } = useTranslation();

  return (
    <div className={css.waterItem}>
      <div>
        <svg className={css.waterIcon}>
          <use href={`${sprite}#icon-glass`} />
        </svg>
      </div>
      <div className={css.waterInfo}>
        <p className={css.volume}>{t('waterItem.volume', { volume })}</p>
        <p className={css.time}>{t('waterItem.time', { time })}</p>
      </div>
      <div className={css.waterButtons}>
        <button
          type="button"
          className={css.waterButton}
          onClick={() => {
          }}
        >
          <svg className={css.editBtn}>
            <use href={`${sprite}#icon-edit`} />
          </svg>
        </button>
        <button
          type="button"
          className={css.waterButton}
          onClick={() => {
          }}
        >
          <svg className={css.removeBtn}>
            <use href={`${sprite}#icon-trash`} />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WaterItem;
