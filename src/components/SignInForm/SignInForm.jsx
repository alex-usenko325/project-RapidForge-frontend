// import clsx from 'clsx';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Logo from '../Logo/Logo';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { signin } from '../../redux/auth/operations';
import s from '../SignUpForm/SignUpForm.module.css';

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

    // <div className={clsx('test')}>
    // <div className="authSection">
    //   <Logo />
    //   <div className="authWrap">
    //     <h2 className="authSubtitle">Sign In</h2>
    //     <Formik
    //       initialValues={initialValues}
    //       onSubmit={handleSubmit}
    //       validationSchema={SingInValidationSchema}
    //     >
    //       <Form className="authForm">
    //         <div className="authFormWrap">
    //           <label className="authLabel">
    //             <span className="labelSpan">E-mail</span>
    //             <Field
    //               className="authField"
    //               type="email"
    //               name="email"
    //               placeholder="Enter your email"
    //               required
    //             />
    //             <ErrorMessage
    //               name="email"
    //               component={'span'}
    //               className="errorMessage"
    //             />
    //           </label>
    //           <label className="authLabel">
    //             <span className="labelSpan">Password</span>
    //             <Field
    //               className="authField"
    //               type="password"
    //               name="password"
    //               placeholder="Enter your password"
    //               required
    //             />
    //             <ErrorMessage
    //               name="password"
    //               component={'span'}
    //               className="errorMessage"
    //             />
    //           </label>
    //         </div>
    //         <div className="authBtnWrap">
    //           <button type="submit" className="authBtn">
    //             Sign In
    //           </button>
    //           <div className="haveAnAccount">
    //             Don’t have an account?{' '}
    //             <a href="/signup" className="authLink">
    //               Sign Up
    //             </a>
    //           </div>
    //         </div>
    //       </Form>
    //     </Formik>
    //   </div>
    // </div>
    // </div>
  );
};

export default SignInForm;
