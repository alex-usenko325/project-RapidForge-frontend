import { useTranslation } from 'react-i18next';
import css from './WaterList.module.css';
import WaterItem from '../WaterItem/WaterItem';
import {  useSelector } from 'react-redux';
import { selectWaterRecords } from '../../redux/water/selectors';
// можливо у майбутньому використовувати інший селектор, замість  - selectWaterRecords
const WaterList = () => {
    const { t } = useTranslation();
    
  const waterList = useSelector(selectWaterRecords);
  console.log('дані селектора selectWaterRecords', waterList);
  return (
    <>
      <ul className={css.waterList}>
        {waterList?.length > 0 ? (
          waterList?.map(item => (
            <li key={item._id} className={css.waterItem}>
              <WaterItem
                id={item._id}
                volume={item.volume}
                time={item.time}
              />
            </li>
          ))
        ) : (
          <p className={css.noWater}>{t('waterList.noEntries')}</p>
        )}
      </ul>
    </>
  );
};

export default WaterList;
