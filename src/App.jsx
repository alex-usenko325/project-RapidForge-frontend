import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { lazy, useEffect, Suspense } from 'react';
import { RotatingLines } from 'react-loader-spinner';

import PrivateRoute from './routes/PrivateRoute';
import RestrictedRoute from './routes/RestrictedRoute';
import { getUserData } from './redux/user/operations';

import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Layout from './components/Layout';

const HomePage = lazy(() => import('./pages/HomePage/HomePage.jsx'));
const TrackerPage = lazy(() => import('./pages/TrackerPage/TrackerPage.jsx'));
const SignUpPage = lazy(() => import('./pages/SignUpPage/SignUpPage.jsx'));
const SignInPage = lazy(() => import('./pages/SignInPage/SignInPage.jsx'));

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUserData());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <Layout>
      <Suspense
        fallback={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <RotatingLines
              visible={true}
              height="96"
              width="96"
              color="grey"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
            />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/signin"
            element={
              <RestrictedRoute isLoggedIn={isLoggedIn}>
                <SignInPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <RestrictedRoute isLoggedIn={isLoggedIn}>
                <SignUpPage />
              </RestrictedRoute>
            }
          />
          <Route
            path="/tracker"
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <TrackerPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
