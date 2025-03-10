import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { sendVerificationEmail } from '../../redux/auth/operations'; // Операція для відправки
import s from './SendVerificationEmail.module.css';

const SendVerification = ({ email }) => {
  const dispatch = useDispatch();
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (email) {
      const sendEmail = async () => {
        try {
          console.log('Sending verification email to:', email); // Логування email перед відправкою

          await dispatch(sendVerificationEmail(email)); // Викликати action з email
          console.log('Verification email sent successfully.'); // Логування успішної відправки

          setIsSent(true);
        } catch (err) {
          console.error('Verification email send failed: ', err); // Лог помилки, якщо вона сталася
          setIsSent(false);
          setErrorMessage(
            'Failed to send verification email. Please try again.'
          );
        }
      };

      sendEmail(); // Відправляємо лист при монтуванні компонента
    } else {
      setErrorMessage('No email provided.');
      console.error('No email provided.'); // Лог, якщо email не передано
    }
  }, [dispatch, email]); // Залежить від email

  const handleOpenEmail = () => {
    window.open('mailto:', '_blank');
  };

  return (
    <div className={s.verificationContainer}>
      <h1 className={s.verificationMessage}>
        {isSent ? (
          <span>Please check your email for the verification link.</span>
        ) : (
          <span>Sending verification email...</span>
        )}
      </h1>
      {errorMessage && <p className={s.errorMessage}>{errorMessage}</p>}
      {isSent && (
        <button className={s.verificationBtn} onClick={handleOpenEmail}>
          Open email client
        </button>
      )}
    </div>
  );
};

export default SendVerification;
