import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Додано useSelector
import { useLocation, Link } from 'react-router-dom';
import { verifyEmail } from '../../redux/auth/operations';
import {
  selectVerificationStatus,
  selectVerificationError,
} from '../../redux/auth/selectors';
import s from './VerifyModal.module.css';
import Modal from '../Modal/Modal';
import { GiConfirmed } from 'react-icons/gi';
import { FiXCircle } from 'react-icons/fi'; // Активовано
import clsx from 'clsx';
import { closeModalAction } from '../../redux/modal/operations';
import { useTranslation } from 'react-i18next';

const VerifyEmailToken = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();

  const verificationStatus = useSelector(selectVerificationStatus);
  const verificationError = useSelector(selectVerificationError);

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
      {verificationStatus === 'succeeded' && (
        <div className={s.wrapper}>
          <GiConfirmed className={clsx(s.icon, s.success)} />
          <h2 className={s.title}>
            {t('sendVerifyEmail.verificationSuccess.title')}
          </h2>
          <p className={s.paragraph}>
            {t('sendVerifyEmail.verificationSuccess.message')}
          </p>
          <div className={s.btnWrap}>
            <button type="submit" className={s.btn} onClick={handleClose}>
              {t('sendVerifyEmail.verificationSuccess.button')}
            </button>
          </div>
        </div>
      )}

      {verificationStatus === 'failed' && (
        <div className={s.wrapper}>
          <FiXCircle className={clsx(s.icon, s.error)} />
          <h2 className={s.title}>
            {t('sendVerifyEmail.verificationError.title')}
          </h2>
          <p className={s.paragraph}>
            {verificationError ||
              t('sendVerifyEmail.verificationError.message')}
          </p>
          <div className={s.btnWrap}>
            <Link to="/signup" className={s.btn}>
              {t('sendVerifyEmail.verificationError.link')}
            </Link>
            <button
              type="submit"
              className={clsx(s.btn, s.grey)}
              onClick={handleClose}
            >
              {t('sendVerifyEmail.verificationError.button')}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default VerifyEmailToken;
