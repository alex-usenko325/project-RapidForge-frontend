import s from './AdvantagesSection.module.css';
import customer1 from '../../assets/images/customers/desktop/1x/customer-1-desk-x1.png';
import customer2 from '../../assets/images/customers/desktop/1x/customer-2-desk-x1.png';
import customer3 from '../../assets/images/customers/desktop/1x/customer-3-desk-x1.png';
import { useDispatch, useSelector } from 'react-redux';
import { getClientsNumber } from '../../redux/user/operations.js';
import { selectUsersCount } from '../../redux/user/selectors.js';
import { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import LocalizationDropdownMenu  from '../LocalizationDropdownMenu/LocalizationDropdownMenu'
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
      <LocalizationDropdownMenu />
      <div className={s.customers}>
        <div className={s.img}>
          {customers.map((img, index) => (
            <img src={img} alt="user" key={index} className={s.avatar} />
          ))}
        </div>

        <p className={s.text}>
          <Trans i18nKey={userCount} values={{ userCount }} />
          <span> {t('advantagesSection.happy')}</span> {t('advantagesSection.customers')}
        </p>
      </div>
      <ul className={s.benefits}>
        <li className={s.benefitHabit}>{t('advantagesSection.habitdrive')}</li>
        <li className={s.benefitStatistics}>{t('advantagesSection.viewstatistics')}</li>
        <li className={s.benefitSetting}>{t('advantagesSection.personalratesetting')}</li>
      </ul>
    </div>
  );
};

export default AdvantagesSection;
