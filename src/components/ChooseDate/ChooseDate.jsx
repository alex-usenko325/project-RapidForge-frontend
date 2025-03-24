import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectSelectedDate } from '../../redux/water/selectors.js';
import dayjs from 'dayjs';
import s from './ChooseDate.module.css';

const ChooseDate = () => {
  const { t } = useTranslation();

  const selectedDate = useSelector(selectSelectedDate);
  const formatDate = dateString => {
    const date = dayjs(dateString);
    const day = date.date();
    const monthIndex = date.month();
    const months = t('months', { returnObjects: true });
    const month = months[Object.keys(months)[monthIndex]];

    return `${day}, ${month}`;
  };
  return <span className={s.day}>{formatDate(selectedDate)}</span>;
};

export default ChooseDate;
