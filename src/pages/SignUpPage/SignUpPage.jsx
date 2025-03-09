import { useEffect, useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import clsx from 'clsx';
import s from './SignUpPage.module.css';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1440);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1440);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Функція для перенаправлення на сторінку верифікації
  const handleSignUpSuccess = () => {
    navigate('/verification');
  };

  return (
    <div className={clsx('container', s.authContainer)}>
      <SignUpForm onSignUpSuccess={handleSignUpSuccess} />
      {isLargeScreen && <AdvantagesSection />}
    </div>
  );
};

export default SignUpPage;
