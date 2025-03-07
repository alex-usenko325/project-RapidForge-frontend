import s from './WelcomeSection.module.css';

const WelcomeSection = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.logo}>Logo</div>
      <h2 className={s.subtitle}>Record daily water intake and track</h2>
      <h1 className={s.title}>Water consumption tracker</h1>
      <div className={s.btnWrapper}>
        <button type="button" className={s.btnTracker}>
          Try tracker
        </button>
        <button type="button" className={s.btnSignIn}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default WelcomeSection;
