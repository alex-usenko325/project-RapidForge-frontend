import Modal from '../Modal/Modal';
import s from '../SendVerifyEmail/SendVerifyEmail.module.css';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
const EmailInUseModal = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    isOpen && (
      <Modal onClose={closeModal}>
        <div className={s.wrapper}>
          <h2 className={s.title}>{t('emailInUseModal.title')}</h2>
          <p className={s.paragraph}>{t('emailInUseModal.message')}</p>
          <div className={s.btnWrap}>
            <Link className={s.btn} to="/signin">
              {t('emailInUseModal.signInLink')}
            </Link>
            <button
              type="submit"
              className={clsx(s.btn, s.grey)}
              onClick={closeModal}
            >
              {t('emailInUseModal.close')}
            </button>
          </div>
        </div>
      </Modal>
    )
  );
};

export default EmailInUseModal;
