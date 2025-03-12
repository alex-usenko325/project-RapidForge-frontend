import { useDispatch } from 'react-redux';
import Modal from '../Modal/Modal';
import s from '../SendVerifyEmail/SendVerifyEmail.module.css';
import clsx from 'clsx';
import { closeModalAction } from '../../redux/modal/operations';

const VerifyModal = () => {
  const dispatch = useDispatch();
  const handleClose = () => {
    closeModalAction(dispatch);
  };

  return (
    <Modal>
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
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default VerifyModal;
