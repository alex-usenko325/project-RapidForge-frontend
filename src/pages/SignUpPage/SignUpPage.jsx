import { useEffect, useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import clsx from 'clsx';
import s from './SignUpPage.module.css';
// import { useNavigate } from 'react-router-dom';
// import VerifyEmailModal from '../../components/VerifyEmailModal/VerifyEmailModal';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/modal/slice';
import { selectModalComponent } from '../../redux/modal/selectors';

const SignUpPage = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1440);
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1440);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Функція відкриття модалки після успішної реєстрації
  const handleSignUpSuccess = () => {
    dispatch(openModal(<VerifyEmailModal />));
  };

  // Функція для перенаправлення на сторінку верифікації
  // const handleSignUpSuccess = () => {
  //   navigate('/verification');
  // };

  return (
    <div className={clsx('container', s.authContainer)}>
      <SignUpForm onSignUpSuccess={handleSignUpSuccess} />
      {isLargeScreen && <AdvantagesSection />}

      {selectModalComponent}
    </div>
  );
};

export default SignUpPage;
