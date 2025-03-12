import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { verifyEmail } from '../../redux/auth/operations';
import {
  selectVerificationStatus,
  selectVerificationError,
} from '../../redux/auth/selectors';
import s from './SendVerifyEmail.module.css';
import Modal from '../Modal/Modal';
import { GiConfirmed } from 'react-icons/gi';
// import { FiXCircle } from 'react-icons/fi';
import clsx from 'clsx';
import { closeModalAction } from '../../redux/modal/operations';

const SendVerifyEmail = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      dispatch(verifyEmail(token));
    }
  }, [dispatch, token]);

  const handleClose = () => {
    closeModalAction(dispatch);
  };

  return (
    <Modal>
      {/* {verificationStatus === 'succeeded' && ( */}
      <div className={s.wrapper}>
        <GiConfirmed className={clsx(s.icon, s.success)} />
        <h2 className={s.title}>Verification success</h2>
        <p className={s.paragraph}>
          You have successfully verified your email.
        </p>
        <div className={s.btnWrap}>
          <button type="submit" className={s.btn} onClick={handleClose}>
            Ok
          </button>
        </div>
      </div>
      {/* )} */}
      {/* {verificationStatus === 'failed' && (
        <div className={s.wrapper}>
          <FiXCircle className={clsx(s.icon, s.error)} />
          <h2 className={s.title}>Verification error</h2>
          <p className={s.paragraph}>
            {verificationError || 'Try one more time'}
          </p>
          <div className={s.btnWrap}>
            <Link to="/signup" className={s.btn}>
              Go back to Sign Up
            </Link>
            <button
              type="submit"
              className={clsx(s.btn, s.grey)}
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      )} */}
    </Modal>
  );
};

export default SendVerifyEmail;
