import { ErrorMessage, Field, Form, Formik } from 'formik';
import Logo from '../Logo/Logo';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { signup, sendVerificationEmail } from '../../redux/auth/operations';
import s from './SignUpForm.module.css';
import { useState } from 'react';
import sprite from '../../assets/sprite.svg';

const SingUpValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required field!'),
  password: Yup.string()
    .min(6, 'Password is too short!')
    .max(50, 'Password is too long!')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter!')
    .matches(/[0-9]/, 'Password must contain at least one number!')
    .matches(
      /[!@#$%^&*]/,
      'Password must contain at least one special character!'
    )
    .required('Password is required field!'),
  repeatPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
});

const initialValues = {
  email: '',
  password: '',
  repeatPassword: '',
};

const SignUpForm = ({ onSignUpSuccess }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const handleSubmit = (values, actions) => {
    // Спочатку викликаєш signup
    dispatch(signup({ email: values.email, password: values.password }))
      .then(() => {
        // Після успішної реєстрації викликаєш sendVerificationEmail з email
        dispatch(sendVerificationEmail(values.email))
          .then(() => {
            onSignUpSuccess(); // Відправляємо користувача на іншу сторінку
            actions.resetForm();
          })
          .catch(err => {
            setError(err.message); // Обробка помилки відправки email
            actions.setSubmitting(false);
          });
      })
      .catch(err => {
        setError(err.message); // Обробка помилки реєстрації
        actions.setSubmitting(false);
      });
  };

  const [showPassword, changeShowPassword] = useState(false);
  const [showRepeatPassword, changeShowRepeatPassword] = useState(false);

  return (
    <div className={s.authSection}>
      <Logo />
      <div className={s.authWrap}>
        <h2 className={s.authSubtitle}>Sign Up</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={SingUpValidationSchema}
          validateOnChange={true} // Включаємо валідацію на кожну зміну
          validateOnBlur={true} // Включаємо валідацію при втраті фокусу
        >
          <Form className={s.authForm}>
            <div className={s.authFormWrap}>
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
              <label className={s.authLabel}>
                <span className={s.labelSpan}>Password</span>
                <div className={s.inputWrap}>
                  <Field
                    className={s.authField}
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter your password"
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
              <label className={s.authLabel}>
                <span className={s.labelSpan}>Repeat password</span>
                <div className={s.inputWrap}>
                  <Field
                    className={s.authField}
                    type={showRepeatPassword ? 'text' : 'password'}
                    name="repeatPassword"
                    placeholder="Repeat password"
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
            </div>
            <div className={s.authBtnWrap}>
              <button type="submit" className={s.authBtn}>
                Sign Up
              </button>
              {error && <div className={s.error}>{error}</div>}
              <div className={s.haveAnAccount}>
                Already have an account?{' '}
                <a href="/signin" className={s.authLink}>
                  Sign In
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
