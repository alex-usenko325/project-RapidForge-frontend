import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { verifyEmail } from '../../redux/auth/operations';
import {
  selectVerificationStatus,
  selectVerificationError,
} from '../../redux/auth/selectors';
import s from './VerifyEmail.module.css';
// import Modal from '../Modal/Modal';
// import { GiConfirmed } from 'react-icons/gi';
// import { FiXCircle } from 'react-icons/fi';
// import clsx from 'clsx';

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
    // <Modal>
    //   {verificationStatus === 'succeeded' && (
    //     <div className={s.wrapper}>
    //       <GiConfirmed className={clsx(s.icon, s.success)} />
    //       <h2 className={s.title}>Verification success</h2>
    //       <p className={s.paragraph}>
    //         You have successfully verified your email.
    //       </p>
    //       <div className={s.btnWrap}>
    //         <button type="submit" className={s.btn}>
    //           Ok
    //         </button>
    //       </div>
    //     </div>
    //   )}
    //   {verificationStatus === 'failed' && (
    //     <div className={s.wrapper}>
    //       <FiXCircle className={clsx(s.icon, s.error)} />
    //       <h2 className={s.title}>Verification error</h2>
    //       <p className={s.paragraph}>
    //         {verificationError || 'Try one more time'}
    //       </p>
    //       <div className={s.btnWrap}>
    //         <button type="submit" className={s.btn}>
    //           Ok
    //         </button>
    //       </div>
    //     </div>
    //   )}
    // </Modal>
  );
};

export default VerifyEmail;
