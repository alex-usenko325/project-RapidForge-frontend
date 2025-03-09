import WelcomeSection from '../../components/WelcomeSection/WelcomeSection.jsx';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection.jsx';
import s from './HomePage.module.css';
import clsx from 'clsx';
import DeleteWaterModal from '../../components/DeleteWaterModal/DeleteWaterModal.jsx';

const HomePage = () => {
  return (
    <div className={clsx('container', s.wrapper)}>
      <DeleteWaterModal />
      <WelcomeSection />
      <AdvantagesSection />
    </div>
  );
};
export default HomePage;
