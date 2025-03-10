import { ErrorMessage, Field, Form, Formik } from 'formik';
import Modal from '../Modal/Modal';
import s from './ResetPwdModal.module.css';

const ResetPwdModal = () => {
  return (
    <div>
      <Modal>
        <div className={s.wrapper}>
          <h2 className={s.title}>Password reset</h2>
          <p className={s.paragraph}>
            You will receive a link to create a new password via email.
          </p>
          <Formik>
            <Form className={s.form}>
              <label className={s.authLabel}>
                <span className={s.labelSpan}>E-mail</span>
                <Field
                  className={s.authField}
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                />
                <ErrorMessage
                  name="email"
                  component={'span'}
                  className={s.errorMessage}
                />
              </label>
              {/* <div className={s.authBtnWrap}> */}
              <button type="submit" className={s.btn}>
                Send
              </button>
              {/* </div> */}
            </Form>
          </Formik>
        </div>
      </Modal>
    </div>
  );
};

export default ResetPwdModal;
