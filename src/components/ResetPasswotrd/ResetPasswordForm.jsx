import { ErrorMessage, Field, Form, Formik } from 'formik';
import Logo from '../Logo/Logo';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import {
  resetPassword,
  sendResetPasswordEmail,
} from '../../redux/auth/operations';
import s from '../SignUpForm/SignUpForm.module.css';
import { useState } from 'react';
import sprite from '../../assets/sprite.svg';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import LocalizationDropdownMenu from '../LocalizationDropdownMenu/LocalizationDropdownMenu';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';

const initialValues = {
  email: '',
  password: '',
  repeatPassword: '',
};

const ResetPasswordForm = ({ token }) => {
  const isToken = Boolean(token);
  const EmailValidationSchema = Yup.object({
    email: Yup.string()
      .email(() => i18next.t('signUp.validation.email.invalid'))
      .required(() => i18next.t('signUp.validation.email.required')),
  });

  const PasswordValidationSchema = Yup.object({
    password: Yup.string()
      .min(6, () => i18next.t('signUp.validation.password.short'))
      .max(18, () => i18next.t('signUp.validation.password.long'))
      .matches(/[A-Z]/, () => i18next.t('signUp.validation.password.uppercase'))
      .matches(/[0-9]/, () => i18next.t('signUp.validation.password.number'))
      .matches(/[!@#$%^&*]/, () =>
        i18next.t('signUp.validation.password.special')
      )
      .required(() => i18next.t('signUp.validation.password.required')),

    repeatPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], () =>
        i18next.t('signUp.validation.password.match')
      )
      .required(() => i18next.t('signUp.validation.password.confirmRequired')),
  });

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (values, actions) => {
    setIsLoading(true); // Встановлюємо isLoading у true перед початком реєстрації
    console.log('from handleSubmit: ', values.email);
    if (!isToken) {
      dispatch(sendResetPasswordEmail(values.email))
        .unwrap(payload => console.log('from unwrap: ', payload))
        .then(() => {
          setIsLoading(false);
          return toast(
            <span>The link to reset password page was sent to your email</span>
          );
        })
        .catch(err => {
          setError(err.message); // Обробка помилки реєстрації
          actions.setSubmitting(false);
          setIsLoading(false); // Завершуємо завантаження

          return toast.error(
            <span>
              {`${err}. `}
              Please, try again
            </span>
          );
        });
      setIsLoading(false);
      return;
    }
    dispatch(resetPassword({ token, password: values.password }))
      .unwrap()
      .then(() => {
        return toast(
          <span>
            Password reset successfully
            <Link to="/signin" target="_blank" rel="noopener noreferrer">
              Please <b>Log In</b>
            </Link>
          </span>
        );
      })
      .catch(err => {
        setError(err.message);
        actions.setSubmitting(false);
        setIsLoading(false); // Завершуємо завантаження

        return toast.error(
          <span>
            {`${err}. `}
            Please, try again
          </span>
        );
      });
    setIsLoading(false);
  };

  const [showPassword, changeShowPassword] = useState(false);
  const [showRepeatPassword, changeShowRepeatPassword] = useState(false);

  return (
    <div className={s.authSection}>
      <LocalizationDropdownMenu />
      <Logo />
      <div className={s.authWrap}>
        <h2 className={s.authSubtitle}>{t('resetPassword.reset_password')}</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={
            isToken ? PasswordValidationSchema : EmailValidationSchema
          }
          validateOnChange={true} // Включаємо валідацію на кожну зміну
          validateOnBlur={true} // Включаємо валідацію при втраті фокусу
        >
          <Form className={s.authForm}>
            <div className={s.authFormWrap}>
              {!token && (
                <label className={s.authLabel}>
                  <span className={s.labelSpan}>
                    {t('resetPassword.e_mail')}
                  </span>
                  <Field
                    className={s.authField}
                    type="email"
                    name="email"
                    placeholder={t('signUp.enter_your_email')}
                    required
                  />
                  <ErrorMessage
                    name="email"
                    component={'span'}
                    className={s.errorMessage}
                  />
                </label>
              )}
              {isToken && (
                <>
                  <label className={s.authLabel}>
                    <span className={s.labelSpan}>
                      {t('resetPassword.password')}
                    </span>
                    <div className={s.inputWrap}>
                      <Field
                        className={s.authField}
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder={t('resetPassword.enter_your_password')}
                        required
                      />
                      <svg
                        className={s.authIcon}
                        onClick={() => changeShowPassword(!showPassword)}
                      >
                        {!showPassword && (
                          <use xlinkHref={`${sprite}#icon-eye-off`} />
                        )}
                        {showPassword && (
                          <use xlinkHref={`${sprite}#icon-eye`} />
                        )}
                      </svg>
                    </div>
                    <ErrorMessage
                      name="password"
                      component={'span'}
                      className={s.errorMessage}
                    />
                  </label>
                  <label className={s.authLabel}>
                    <span className={s.labelSpan}>
                      {t('resetPassword.repeat_password')}
                    </span>
                    <div className={s.inputWrap}>
                      <Field
                        className={s.authField}
                        type={showRepeatPassword ? 'text' : 'password'}
                        name="repeatPassword"
                        placeholder={t('resetPassword.repeat_password')}
                        required
                      />
                      <svg
                        className={s.authIcon}
                        onClick={() =>
                          changeShowRepeatPassword(!showRepeatPassword)
                        }
                      >
                        {!showRepeatPassword && (
                          <use xlinkHref={`${sprite}#icon-eye-off`} />
                        )}
                        {showRepeatPassword && (
                          <use xlinkHref={`${sprite}#icon-eye`} />
                        )}
                      </svg>
                    </div>
                    <ErrorMessage
                      name="repeatPassword"
                      component={'span'}
                      className={s.errorMessage}
                    />
                  </label>
                </>
              )}
            </div>
            <div className={s.authBtnWrap}>
              <button type="submit" className={s.authBtn} disabled={isLoading}>
                {isLoading ? (
                  <RotatingLines
                    visible={true}
                    height="16"
                    width="16"
                    color="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                  />
                ) : (
                  t('resetPassword.reset_password')
                )}
              </button>

              {error && <div className={s.error}>{error}</div>}
              <div className={s.haveAnAccount}>
                {t('signUp.already_have_account')}{' '}
                <a href="/signin" className={s.authLink}>
                  {t('signUp.sign_in')}
                </a>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
