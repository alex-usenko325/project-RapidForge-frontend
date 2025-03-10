import Modal from '../Modal/Modal';
import s from '../verifyEmail/VerifyEmail.module.css';
import clsx from 'clsx';

const VerifyEmailModal = () => {
  return (
    <Modal>
      <div className={s.wrapper}>
        <h2 className={s.title}>Verify your email</h2>
        <p className={s.paragraph}>
          Please check your email for verification link.
        </p>
        <div className={s.btnWrap}>
          <button type="submit" className={s.btn}>
            Open email client
          </button>
          <button type="submit" className={clsx(s.btn, s.grey)}>
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default VerifyEmailModal;
