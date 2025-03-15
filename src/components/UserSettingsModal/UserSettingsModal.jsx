import s from './UserSettingsModal.module.css';
import UserSettingsForm from '../UserSettingsForm/UserSettingsForm.jsx';
import Modal from '../Modal/Modal.jsx';
import { useTranslation } from 'react-i18next';

export default function UserSettingsModal({ onClose }) {
  const { t } = useTranslation();

  return (
    <Modal onClose={onClose} modalClass={s.settings}>
      <h2>{t('userSettingsModal.settings')}</h2>
      <UserSettingsForm closeModal={onClose} />
    </Modal>
  );
}
