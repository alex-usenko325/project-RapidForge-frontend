import clsx from 'clsx';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Logo from '../Logo/Logo';

const SignUpForm = () => {
  return (
    <div className={clsx('container', 'authContainer')}>
      <div className="authSection">
        <Logo />
        <div className="authWrap">
          <h2 className="subtitle">Sign Up</h2>
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
                    name="password"
                    component={'span'}
                    className="errorMessage"
                  />
                </label>
              </div>
              <div className="authFormWrap">
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
