import React from 'react';
import s from './UserSettingsModal.module.css';
import UserSettingsForm from '../UserSettingsForm/UserSettingsForm.jsx';

export default function UserSettingsModal() {
  return (
    <div className={s.settings_modal}>
      <h2>Settings</h2>
      <UserSettingsForm />
    </div>
  );
}
