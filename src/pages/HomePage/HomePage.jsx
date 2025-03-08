import WelcomeSection from '../../components/WelcomeSection/WelcomeSection.jsx';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection.jsx';
import s from './HomePage.module.css';
import clsx from 'clsx';
import UserBar from '../../components/UserBar/UserBar.jsx';

const HomePage = () => {
  return (
    <div className={clsx('container', s.wrapper)}>
      <UserBar />
      <WelcomeSection />
      <AdvantagesSection />
    </div>
  );
};
export default HomePage;
