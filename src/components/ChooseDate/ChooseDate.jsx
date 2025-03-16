import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectSelectedDate } from '../../redux/water/selectors.js';
import s from './ChooseDate.module.css';

const ChooseDate = () => {
  const { t } = useTranslation();

  const selectedDate = useSelector(selectSelectedDate);

  const formatDate = dateString => {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const months = t('months', { returnObjects: true });
    const month = months[Object.keys(months)[monthIndex]];

    return `${day}, ${month}`;
  };

  const dateToShow = selectedDate || new Date().toISOString();


  return <span className={s.day}>{formatDate(dateToShow)}</span>;
};

export default ChooseDate;
