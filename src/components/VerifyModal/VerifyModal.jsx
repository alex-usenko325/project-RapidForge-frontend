import Modal from '../Modal/Modal';
import s from '../SendVerifyEmail/SendVerifyEmail.module.css';
import clsx from 'clsx';
import { useState } from 'react';

const VerifyModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    isOpen && (
      <Modal onClose={closeModal}>
        <div className={s.wrapper}>
          <h2 className={s.title}>Verify your email</h2>
          <p className={s.paragraph}>
            Please check your email for verification link.
          </p>
          <div className={s.btnWrap}>
            <a className={s.btn} href="mailto:example@email.com">
              Open email client
            </a>
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

export default VerifyModal;
