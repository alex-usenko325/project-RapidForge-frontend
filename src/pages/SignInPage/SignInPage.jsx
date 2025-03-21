import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import SignInForm from '../../components/SignInForm/SignInForm';
import {
  openModalAction,
  closeModalAction,
} from '../../redux/modal/operations';
import { selectModalComponent } from '../../redux/modal/selectors';
import s from '../SignUpPage/SignUpPage.module.css';
import VerifyEmailToken from '../../components/VerifyModal/VerifyEmailToken.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Імпортуємо GoogleOAuthProvider

const SignInPage = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1440);
  const dispatch = useDispatch();
  const location = useLocation();
  const modalComponent = useSelector(selectModalComponent);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1440);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Перевірка наявності токена в URL і відкриття VerifyEmail
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    if (token) {
      openModalAction(dispatch, 'VerifyEmail');
    }
  }, [location, dispatch]);

  const handleCloseModal = () => {
    closeModalAction(dispatch);
  };

  return (
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
      redirectUri="http://localhost:5173"
    >
      <div className={clsx('container', s.authContainer)}>
        <SignInForm />
        {isLargeScreen && <AdvantagesSection />}

        {/* Відображення модалки, якщо вона активна */}
        {modalComponent === 'VerifyEmail' && (
          <VerifyEmailToken onClose={handleCloseModal} />
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default SignInPage;
