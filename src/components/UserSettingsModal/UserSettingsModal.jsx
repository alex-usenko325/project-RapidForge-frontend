import s from './UserSettingsModal.module.css';
import UserSettingsForm from '../UserSettingsForm/UserSettingsForm.jsx';
import Modal from '../Modal/Modal.jsx';

export default function UserSettingsModal({ onClose }) {
  return (
    <Modal onClose={onClose} modalClass={s.settings}>
      <h2>Settings</h2>
      <UserSettingsForm closeModal={onClose} />
    </Modal>
  );
}
