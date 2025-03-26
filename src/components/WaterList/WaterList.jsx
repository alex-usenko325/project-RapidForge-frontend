import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  selectSelectedDate,
  selectWaterRecords,
  selectWaterRecordsByMonth,
} from '../../redux/water/selectors';
import WaterItem from '../WaterItem/WaterItem';
import css from './WaterList.module.css';

export const WaterList = () => {
  const { t } = useTranslation();
  const waterListByDay = useSelector(selectWaterRecords);
  const waterListByMonth = useSelector(selectWaterRecordsByMonth);
  const selectedDate = useSelector(selectSelectedDate);
  const selectedDateFormatted = selectedDate.split('T')[0];

  const filteredWaterList = selectedDate
    ? waterListByMonth.filter(
        item => item.date === selectedDateFormatted
      )
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
