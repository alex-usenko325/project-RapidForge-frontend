import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { lazy, useEffect } from 'react';
import PrivateRoute from './routes/PrivateRoute';
import RestrictedRoute from './routes/RestrictedRoute';
import { getUserData } from './redux/user/operations';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Layout from './components/Layout';
// import OnboardingTour from './components/OnboardingTour/OnboardingTour';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const TrackerPage = lazy(() => import('./pages/TrackerPage/TrackerPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage/SignUpPage'));
const SignInPage = lazy(() => import('./pages/SignInPage/SignInPage'));

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  // const isRefreshingUser = useSelector(state => state.auth.isRefreshingUser);

  useEffect(() => {
    if (isLoggedIn) {
      console.log('✅ Отримуємо дані користувача...');
      dispatch(getUserData());
    }
  }, [dispatch, isLoggedIn]);

  // if (isRefreshingUser) {
  // }

  return (
    <Layout>
      {/* <OnboardingTour /> */}
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
    </Layout>
  );
};

export default App;
