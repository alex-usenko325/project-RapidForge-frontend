import clsx from 'clsx';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Logo from '../Logo/Logo';

const SignInForm = () => {
  return (
    <div className={clsx('container', 'authContainer')}>
      <div className="authSection">
        <Logo />
        <div className="authWrap">
          <h2 className="authSubtitle">Sign In</h2>
          <Formik>
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
                  <a href="/register" className="authLink">
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
