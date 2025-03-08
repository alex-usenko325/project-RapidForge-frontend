import { ErrorMessage, Field, Form, Formik } from 'formik';
import Logo from '../Logo/Logo';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { signup } from '../../redux/auth/operations';
import s from './SignUpForm.module.css';

const SingUpValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required field!'),
  password: Yup.string()
    .min(6, 'Password is too short!')
    .max(18, 'Password is too long!')
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

const SignUpForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(signup({ email: values.email, password: values.password }));
    actions.resetForm();
  };

  return (
    <div className={s.authSection}>
      <Logo />
      <div className={s.authWrap}>
        <h2 className={s.authSubtitle}>Sign Up</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={SingUpValidationSchema}
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
                <Field
                  className={s.authField}
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                />
                <ErrorMessage
                  name="password"
                  component={'span'}
                  className={s.errorMessage}
                />
              </label>
              <label className={s.authLabel}>
                <span className="labelSpan">Repeat password</span>
                <Field
                  className={s.authField}
                  type="password"
                  name="repeatPassword"
                  placeholder="Repeat password"
                  required
                />
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
              <div className={s.haveAnAccount}>
                Already have account?{' '}
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
