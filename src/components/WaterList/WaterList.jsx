import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  selectWaterRecords,
  selectWaterTodayRecords,
  selectSelectedDate,
} from '../../redux/water/selectors';
import dayjs from 'dayjs';
import WaterItem from '../WaterItem/WaterItem';
import css from './WaterList.module.css';

export const WaterList = () => {
  const { t } = useTranslation();
  const waterListByDay = useSelector(selectWaterRecords);
  const waterListToday = useSelector(selectWaterTodayRecords);
  const selectedDate = useSelector(selectSelectedDate);

  const formattedSelectedDate = selectedDate.split('T')[0];
  const todayDate = dayjs().format('YYYY-MM-DD');

  const waterList =
    formattedSelectedDate === todayDate ? waterListToday : waterListByDay;

  return (
    <ul className={css.waterList}>
      {waterList?.length > 0 ? (
        waterList.map(item => (
          <li key={item._id} className={css.waterItem}>
            <WaterItem id={item._id} volume={item.volume} time={item.time} />
          </li>
        ))
      ) : (
        <p className={css.noWater}>{t('waterList.noEntries')}</p>
      )}
    </ul>
  );
};

export default WaterList;
