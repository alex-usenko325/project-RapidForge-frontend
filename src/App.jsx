import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import PrivateRoute from './routes/PrivateRoute';
import RestrictedRoute from './routes/RestrictedRoute';
import { refreshUser } from './redux/auth/operations';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import SignInPage from './pages/SignInPage/SignInPage';
import TrackerPage from './pages/TrackerPage/TrackerPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import HomePage from './pages/HomePage/HomePage';
import AddWaterBtn from './components/AddWaterBtn/AddWaterBtn.jsx';

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const isRefreshing = useSelector(state => state.auth.isRefreshing);

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(refreshUser());
    }
  }, [dispatch, isLoggedIn]);

  if (isRefreshing) {
    return <p></p>;
  }

  return (
    <div>
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
      <AddWaterBtn />
    </div>
  );
};

export default App;
