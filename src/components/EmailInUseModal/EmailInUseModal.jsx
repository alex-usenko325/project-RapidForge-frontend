import Modal from '../Modal/Modal';
import s from '../SendVerifyEmail/SendVerifyEmail.module.css';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const EmailInUseModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    isOpen && (
      <Modal onClose={closeModal}>
        <div className={s.wrapper}>
          <h2 className={s.title}>Email already exists</h2>
          <p className={s.paragraph}>
            Please sign in or use a different email.
          </p>
          <div className={s.btnWrap}>
            <Link className={s.btn} to="/signin">
              Go to Sign in
            </Link>
            <button
              type="submit"
              className={clsx(s.btn, s.grey)}
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    )
  );
};

export default EmailInUseModal;
