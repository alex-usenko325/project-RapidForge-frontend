import clsx from 'clsx';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Logo from '../Logo/Logo';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { signin } from '../../redux/auth/operations';

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

  return (
    <div className={clsx('container', 'authContainer')}>
      <div className="authSection">
        <Logo />
        <div className="authWrap">
          <h2 className="authSubtitle">Sign In</h2>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={SingInValidationSchema}
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
              </div>
              <div className="authBtnWrap">
                <button type="submit" className="authBtn">
                  Sign In
                </button>
                <div className="haveAnAccount">
                  Don’t have an account?{' '}
                  <a href="/signup" className="authLink">
                    Sign Up
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

export default SignInForm;
