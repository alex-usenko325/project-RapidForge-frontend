import s from './AdvantagesSection.module.css';
import customer1 from '../../assets/images/customers/desktop/1x/customer-1-desk-x1.png';
import customer2 from '../../assets/images/customers/desktop/1x/customer-2-desk-x1.png';
import customer3 from '../../assets/images/customers/desktop/1x/customer-3-desk-x1.png';
import { useDispatch, useSelector } from 'react-redux';
import { getClientsNumber } from '../../redux/user/operations.js';
import { selectUsersCount } from '../../redux/user/selectors.js';
import { useEffect } from 'react';

const AdvantagesSection = () => {
  const customers = [customer1, customer2, customer3];
  const dispatch = useDispatch();
  const userCount = useSelector(selectUsersCount);

  useEffect(() => {
    dispatch(getClientsNumber());
  }, [dispatch]);

  return (
    <div className={s.wrapper}>
      <div className={s.customers}>
        <div className={s.img}>
          {customers.map((img, index) => (
            <img src={img} alt="user" key={index} className={s.avatar} />
          ))}
        </div>

        <p className={s.text}>
          Our {userCount}
          <span> happy</span> customers
        </p>
      </div>
      <ul className={s.benefits}>
        <li className={s.benefitHabit}>Habit drive</li>
        <li className={s.benefitStatistics}>View statistics</li>
        <li className={s.benefitSetting}>Personal rate setting</li>
      </ul>
    </div>
  );
};

export default AdvantagesSection;
