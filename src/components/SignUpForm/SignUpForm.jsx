import { ErrorMessage, Field, Form, Formik } from 'formik';
import Logo from '../Logo/Logo';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { signup, sendVerificationEmail } from '../../redux/auth/operations';
import s from './SignUpForm.module.css';
import { useState } from 'react';
import sprite from '../../assets/sprite.svg';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import LocalizationDropdownMenu from '../LocalizationDropdownMenu/LocalizationDropdownMenu';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';

const SingUpValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email(() => i18next.t('signUp.validation.email.invalid'))
    .required(() => i18next.t('signUp.validation.email.required')),
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

const initialValues = {
  email: '',
  password: '',
  repeatPassword: '',
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, changeShowPassword] = useState(false);
  const [showRepeatPassword, changeShowRepeatPassword] = useState(false);

  const onSignUpSuccess = () => {
    // Redirect or show success message here
  };

  const handleSubmit = async (values, actions) => {
    setIsLoading(true);

    try {
      await dispatch(
        signup({ email: values.email, password: values.password })
      ).unwrap();
      try {
        await dispatch(sendVerificationEmail(values.email));
        onSignUpSuccess();
        actions.resetForm();
      } catch (err) {
        setError(err.message);
        toast.error(t('errors.email_verification_failed'));
      }
    } catch (err) {
      if (err.status === 409) {
        toast.error(
          <span>
            {t('signIn.email_in_use')}
            <br />
            <Link to="/signin">
              {t('signIn.please')}, <b>{t('signIn.sign_in_toast')}</b>
            </Link>
          </span>
        );
      } else {
        toast.error(t('errors.generic_error'));
      }
    } finally {
      setIsLoading(false);
      actions.setSubmitting(false);
    }
  };

  return (
    <div className={s.authSection}>
      <LocalizationDropdownMenu />
      <Logo />
      <div className={s.authWrap}>
        <h2 className={s.authSubtitle}>{t('signUp.sign_up')}</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={SingUpValidationSchema}
          validateOnChange={true}
          validateOnBlur={true}
        >
          <Form className={s.authForm}>
            <div className={s.authFormWrap}>
              <label className={s.authLabel}>
                <span className={s.labelSpan}>{t('signUp.e_mail')}</span>
                <Field
                  className={s.authField}
                  type="text"
                  name="email"
                  placeholder={t('signUp.enter_your_email')}
                />
                <ErrorMessage
                  name="email"
                  component={'span'}
                  className={s.errorMessage}
                />
              </label>
              <label className={s.authLabel}>
                <span className={s.labelSpan}>{t('signUp.password')}</span>
                <div className={s.inputWrap}>
                  <Field
                    className={s.authField}
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder={t('signUp.enter_your_password')}
                  />
                  <svg
                    className={s.authIcon}
                    onClick={() => changeShowPassword(!showPassword)}
                  >
                    {!showPassword && (
                      <use xlinkHref={`${sprite}#icon-eye-off`} />
                    )}
                    {showPassword && <use xlinkHref={`${sprite}#icon-eye`} />}
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
                  {t('signUp.repeat_password')}
                </span>
                <div className={s.inputWrap}>
                  <Field
                    className={s.authField}
                    type={showRepeatPassword ? 'text' : 'password'}
                    name="repeatPassword"
                    placeholder={t('signUp.repeat_password')}
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
                  t('signUp.sign_up')
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

export default SignUpForm;
