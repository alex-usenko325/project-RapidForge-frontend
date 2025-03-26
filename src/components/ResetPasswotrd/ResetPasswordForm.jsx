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
import { Navigate } from 'react-router-dom';
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

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (values, actions) => {
    setIsLoading(true); // Встановлюємо isLoading у true перед початком реєстрації

    if (!isToken) {
      dispatch(sendResetPasswordEmail(values.email))
        .unwrap()
        .then(() => {
          setIsLoading(false);
          return toast.success(<span>{t('resetPassword.send_success')}</span>);
        })
        .catch(err => {
          actions.setSubmitting(false);

          if (err.status === 404) {
            toast.error(t('resetPassword.email_error'));
          } else if (err.status === 403) {
            toast.error(t('signIn.not_verified'));
          } else {
            toast.error(t('errors.generic_error'));
          }
        });
      setIsLoading(false);
      return;
    }
    dispatch(resetPassword({ token, password: values.password }))
      .unwrap()
      .then(() => {
        return toast.success(
          <span>
            {t('resetPassword.reset_success')}
            <Navigate to="/signin" />
          </span>
        );
      })
      .catch(() => {
        actions.setSubmitting(false);
        setIsLoading(false); // Завершуємо завантаження

        return toast.error(t('errors.generic_error'));
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
                <>
                  <p>{t('resetPassword.note')}</p>
                  <label className={s.authLabel}>
                    <span className={s.labelSpan}>
                      {t('signUp.enter_your_email')}
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
                </>
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
                  t(
                    `resetPassword.${isToken ? 'reset_password' : 'send_email'}`
                  )
                )}
              </button>

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
