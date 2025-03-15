import s from './AdvantagesSection.module.css';
import customer1 from '../../assets/images/customers/desktop/1x/customer-1-desk-x1.png';
import customer2 from '../../assets/images/customers/desktop/1x/customer-2-desk-x1.png';
import customer3 from '../../assets/images/customers/desktop/1x/customer-3-desk-x1.png';
import { useDispatch, useSelector } from 'react-redux';
import { getClientsNumber } from '../../redux/user/operations.js';
import { selectUsersCount } from '../../redux/user/selectors.js';
import { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import LocalizationDropdownMenu from '../LocalizationDropdownMenu/LocalizationDropdownMenu';
const AdvantagesSection = () => {
  const customers = [customer1, customer2, customer3];
  const dispatch = useDispatch();
  const userCount = useSelector(selectUsersCount);

  useEffect(() => {
    dispatch(getClientsNumber());
  }, [dispatch]);

  const { t } = useTranslation();

  return (
    <div className={s.wrapper}>
      {/* <LocalizationDropdownMenu /> */}
      <div className={s.customers}>
        <div className={s.img}>
          {customers.map((img, index) => (
            <img src={img} alt="user" key={index} className={s.avatar} />
          ))}
        </div>

        <p className={s.text}>
          <div className={s.counter}>
            +
            <Trans i18nKey={userCount} values={{ userCount }} />
          </div>
          {t('advantagesSection.our')}{' '}
          <span> {t('advantagesSection.happy')}</span>
          <br />
          {t('advantagesSection.customers')}
        </p>
      </div>
      <div className={s.benefits}>
        <div className={s.benefitsTop}>
          <p className={s.benefitHabit}>
            <span className={s.benefitHabitCircle}></span>
            {t('advantagesSection.habitdrive')}
          </p>
          <p className={s.benefitStatistics}>
            {t('advantagesSection.viewstatistics')}
          </p>
        </div>
        <p className={s.benefitSetting}>
          {t('advantagesSection.personalratesetting')}
        </p>
      </div>
    </div>
  );
};

export default AdvantagesSection;
