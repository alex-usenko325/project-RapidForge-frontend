import clsx from 'clsx';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import SignInForm from '../../components/SignInForm/SignInForm';
import { useEffect, useState } from 'react';
import s from '../SignUpPage/SignUpPage.module.css';

const SignInPage = () => {
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
      <SignInForm />
      {isLargeScreen && <AdvantagesSection />}
    </div>
  );
};

export default SignInPage;
