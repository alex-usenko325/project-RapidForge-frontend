// import clsx from 'clsx';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Logo from '../Logo/Logo';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { signin } from '../../redux/auth/operations';
import s from '../SignUpForm/SignUpForm.module.css';
import sprite from '../../assets/sprite.svg';
import { useState } from 'react';

const SingInValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required field!'),
  password: Yup.string()
    .min(6, 'Password is too short!')
    .max(18, 'Password is too long!')
    .required('Password is required field!'),
});

const initialValues = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(signin(values));
    actions.resetForm();
  };

  const [showPassword, changeShowPassword] = useState(false);

  return (
    <div className={s.authSection}>
      <Logo />
      <div className={s.authWrap}>
        <h2 className={s.authSubtitle}>Sign In</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={SingInValidationSchema}
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
                    {showPassword && (
                      <use xlinkHref={`${sprite}#icon-eye-off`} />
                    )}
                    {!showPassword && <use xlinkHref={`${sprite}#icon-eye`} />}
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
              <button type="submit" className={s.authBtn}>
                Sign In
              </button>
              <div className={s.haveAnAccount}>
                Don’t have an account?{' '}
                <a href="/signup" className={s.authLink}>
                  Sign Up
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
