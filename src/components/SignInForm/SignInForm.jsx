import { ErrorMessage, Field, Form, Formik } from 'formik';
import Logo from '../Logo/Logo';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { signin } from '../../redux/auth/operations';
import s from '../SignUpForm/SignUpForm.module.css';
import sprite from '../../assets/sprite.svg';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import LocalizationDropdownMenu from '../LocalizationDropdownMenu/LocalizationDropdownMenu';
import { RotatingLines } from 'react-loader-spinner'; // Імпортуємо індикатор завантаження

const SingInValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email(() => i18next.t('signIn.validation.email.invalid'))
    .required(() => i18next.t('signIn.validation.email.required')),
  password: Yup.string()
    .min(6, () => i18next.t('signIn.validation.password.short'))
    .max(18, () => i18next.t('signIn.validation.password.long'))
    .required(() => i18next.t('signIn.validation.password.required')),
});

const initialValues = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showPassword, changeShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Додаємо стан завантаження

  const handleSubmit = async (values, actions) => {
    setIsLoading(true); // Встановлюємо isLoading у true при початку відправки
    await dispatch(signin(values));
    setIsLoading(false); // Встановлюємо isLoading у false після завершення
    actions.resetForm();
  };

  return (
    <div className={s.authSection}>
      <LocalizationDropdownMenu />
      <Logo />
      <div className={s.authWrap}>
        <h2 className={s.authSubtitle}>{t('signIn.sign_in')}</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={SingInValidationSchema}
          validateOnChange={true} // Включаємо валідацію на кожну зміну
          validateOnBlur={true} // Включаємо валідацію при втраті фокусу
        >
          <Form className={s.authForm}>
            <div className={s.authFormWrap}>
              <label className={s.authLabel}>
                <span className={s.labelSpan}>{t('signIn.e_mail')}</span>
                <Field
                  className={s.authField}
                  type="email"
                  name="email"
                  placeholder={t('signIn.enter_your_email')}
                  required
                />
                <ErrorMessage
                  name="email"
                  component={'span'}
                  className={s.errorMessage}
                />
              </label>
              <label className={s.authLabel}>
                <span className={s.labelSpan}>{t('signIn.password')}</span>
                <div className={s.inputWrap}>
                  <Field
                    className={s.authField}
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder={t('signIn.enter_your_password')}
                    required
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
                  t('signIn.sign_in')
                )}
              </button>
              <div className={s.haveAnAccount}>
                {t('signIn.dont_have_account')}{' '}
                <a href="/signup" className={s.authLink}>
                  {t('signIn.sign_up')}
                </a>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SignInForm;
