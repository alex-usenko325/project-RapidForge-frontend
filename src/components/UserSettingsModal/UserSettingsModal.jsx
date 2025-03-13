import { useState } from 'react';
import s from './UserSettingsModal.module.css';
import UserSettingsForm from '../UserSettingsForm/UserSettingsForm.jsx';
import Modal from '../Modal/Modal.jsx';

export default function UserSettingsModal() {
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    isOpen && (
      <div className={s.settings_modal}>
        <Modal onClose={closeModal} modalClass={s.settings}>
          <h2>Settings</h2>
          <UserSettingsForm closeModal={closeModal} />
        </Modal>
      </div>
    )
  );
}
