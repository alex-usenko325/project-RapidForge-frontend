import clsx from 'clsx';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Logo from '../Logo/Logo';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { signup } from '../../redux/auth/operations';

const SingUpValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required field!'),
  password: Yup.string()
    .min(6, 'Password is too short!')
    .max(18, 'Password is too long!')
    .pattern(new RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
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
    <div className={clsx('container', 'authContainer')}>
      <div className="authSection">
        <Logo />
        <div className="authWrap">
          <h2 className="authSubtitle">Sign Up</h2>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={SingUpValidationSchema}
          >
            <Form className="authForm">
              <div className="authFormWrap">
                <label className="authLabel">
                  <span className="labelSpan">E-mail</span>
                  <Field
                    className="authField"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                  />
                  <ErrorMessage
                    name="email"
                    component={'span'}
                    className="errorMessage"
                  />
                </label>
                <label className="authLabel">
                  <span className="labelSpan">Password</span>
                  <Field
                    className="authField"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    required
                  />
                  <ErrorMessage
                    name="password"
                    component={'span'}
                    className="errorMessage"
                  />
                </label>
                <label className="authLabel">
                  <span className="labelSpan">Repeat password</span>
                  <Field
                    className="authField"
                    type="password"
                    name="repeatPassword"
                    placeholder="Repeat password"
                    required
                  />
                  <ErrorMessage
                    name="repeatPassword"
                    component={'span'}
                    className="errorMessage"
                  />
                </label>
              </div>
              <div className="authBtnWrap">
                <button type="submit" className="authBtn">
                  Sign Up
                </button>
                <div className="haveAnAccount">
                  Already have account?{' '}
                  <a href="/signin" className="authLink">
                    Sign In
                  </a>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
