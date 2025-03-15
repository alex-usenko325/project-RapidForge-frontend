import Modal from '../Modal/Modal';
import s from '../SendVerifyEmail/SendVerifyEmail.module.css';
import clsx from 'clsx';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const VerifyModal = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    isOpen && (
      <Modal onClose={closeModal}>
        <div className={s.wrapper}>
          <h2 className={s.title}>{t('verifyModal.title')}</h2>
          <p className={s.paragraph}>{t('verifyModal.message')}</p>
          <div className={s.btnWrap}>
            <a className={s.btn} href="mailto:example@email.com">
              {t('verifyModal.link')}
            </a>
            <button
              type="submit"
              className={clsx(s.btn, s.grey)}
              onClick={closeModal}
            >
              {t('verifyModal.button')}
            </button>
          </div>
        </div>
      </Modal>
    )
  );
};

export default VerifyModal;
