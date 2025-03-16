import { useTranslation } from 'react-i18next';
import css from './WaterList.module.css';
import WaterItem from '../WaterItem/WaterItem';
import { useSelector } from 'react-redux';
import {
  selectSelectedDate,
  selectWaterRecords,
  selectWaterRecordsByMonth,
} from '../../redux/water/selectors';

export const WaterList = () => {
  const { t } = useTranslation();

  const waterListByDay = useSelector(selectWaterRecords);

  const waterListByMonth = useSelector(selectWaterRecordsByMonth);
  const selectedDate = useSelector(selectSelectedDate);
  const filteredWaterList = selectedDate
    ? waterListByMonth.filter(item => item.date === selectedDate)
    : waterListByDay;

  return (
    <>
      <ul className={css.waterList}>
        {filteredWaterList?.length > 0 ? (
          filteredWaterList?.map(item => (
            <li key={item._id} className={css.waterItem}>
              <WaterItem id={item._id} volume={item.volume} time={item.time} />
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
