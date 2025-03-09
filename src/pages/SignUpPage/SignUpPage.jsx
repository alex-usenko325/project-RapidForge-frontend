import { useEffect, useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import clsx from 'clsx';
import s from './SignUpPage.module.css';

const SignUpPage = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1440);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1440);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={clsx('container', s.authContainer)}>
      <SignUpForm />
      {isLargeScreen && <AdvantagesSection />}
    </div>
  );
};

export default SignUpPage;
