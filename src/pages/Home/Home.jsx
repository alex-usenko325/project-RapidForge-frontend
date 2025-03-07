import s from './Home.module.css';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection.jsx';
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection.jsx';

const Home = () => {
  return (
    <div className={s.wrapper}>
      <WelcomeSection />
      <AdvantagesSection />
    </div>
  );
};

export default Home;
