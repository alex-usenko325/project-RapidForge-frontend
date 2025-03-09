import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { verifyEmail } from '../../redux/auth/operations';
import {
  selectVerificationStatus,
  selectVerificationError,
} from '../../redux/auth/selectors';
import s from './VerifyEmail.module.css';

const VerifyEmail = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const verificationStatus = useSelector(selectVerificationStatus);
  const verificationError = useSelector(selectVerificationError);

  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token'); // Отримуємо токен з параметрів URL

  useEffect(() => {
    if (token) {
      dispatch(verifyEmail(token)); // Викликаємо операцію для перевірки email
    }
  }, [dispatch, token]);

  return (
    <div className={s.container}>
      {verificationStatus === 'loading' && <h1>Перевірка верифікації...</h1>}
      {verificationStatus === 'succeeded' && (
        <h1>Ваша електронна пошта успішно верифікована! 🎉</h1>
      )}
      {verificationStatus === 'failed' && (
        <h1>Помилка верифікації: {verificationError || 'Спробуйте ще раз!'}</h1>
      )}
    </div>
  );
};

export default VerifyEmail;
