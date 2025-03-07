import s from './WelcomeSection.module.css';
import Logo from '../Logo/Logo.jsx';
import { Link } from 'react-router-dom';

const WelcomeSection = () => {
  return (
    <div className={s.wrapper}>
      <Logo />
      <div className={s.wrapperContent}>
        <p className={s.subtitle}>Record daily water intake and track</p>
        <h1 className={s.title}>Water consumption tracker</h1>
        <div className={s.btnWrapper}>
          <Link to="/signup" className={s.btnTracker}>
            Try tracker
          </Link>
          <Link to="/signin" className={s.btnSignIn}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
