import WelcomeSection from '../../components/WelcomeSection/WelcomeSection.jsx';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection.jsx';
import s from './HomePage.module.css';
import clsx from 'clsx';

const HomePage = () => {
  return (
    <div className={clsx('container', s.wrapper)}>
      <WelcomeSection />
      <AdvantagesSection />
    </div>
  );
};
export default HomePage;
