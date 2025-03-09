import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  sendVerificationEmail,
  verifyEmail,
} from '../../redux/auth/operations';
import { useNavigate, useLocation } from 'react-router-dom';
import s from './Verification.module.css';

const Verification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSent, setIsSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token'); // Отримуємо токен з URL

    const verifyEmailAction = async () => {
      if (token) {
        try {
          await dispatch(verifyEmail(token));
          setIsVerified(true);
          setIsSent(false);
        } catch (err) {
          console.error('Email verification failed: ', err);
          setIsVerified(false);
          setErrorMessage('Failed to verify email. Please try again.');
        }
      } else if (!isSent) {
        try {
          await dispatch(sendVerificationEmail());
          setIsSent(true);
        } catch (err) {
          console.error('Verification email send failed: ', err);
          setIsSent(false);
          setErrorMessage(
            'Failed to send verification email. Please try again.'
          );
        }
      }
    };

    verifyEmailAction();
  }, [dispatch, location.search, isSent]);

  const handleOpenEmail = () => {
    window.open('mailto:', '_blank');
  };

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <div className={s.verificationContainer}>
      <h1 className={s.verificationMessage}>
        {isVerified ? (
          <span className={s.verificationSuccess}>
            Your email has been successfully verified!
          </span>
        ) : isSent ? (
          <span>Please check your email for the verification link.</span>
        ) : (
          <span>Sending verification email...</span>
        )}
      </h1>
      {errorMessage && <p className={s.errorMessage}>{errorMessage}</p>}
      <div className={s.verificationButtons}>
        {isSent && !isVerified && (
          <button className={s.verificationBtn} onClick={handleOpenEmail}>
            Open email client
          </button>
        )}
        <button className={s.verificationBtn} onClick={handleReturnHome}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Verification;
