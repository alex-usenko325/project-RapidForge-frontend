import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import PrivateRoute from './routes/PrivateRoute';
import RestrictedRoute from './routes/RestrictedRoute';
import { refreshUser } from './redux/auth/operations';

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
    return <p>Loading...</p>;
  }

  return (
    <Routes>
      <Route
        path="login"
        element={
          <RestrictedRoute isLoggedIn={isLoggedIn}>
            <Login />
          </RestrictedRoute>
        }
      />
      <Route
        path="register"
        element={
          <RestrictedRoute isLoggedIn={isLoggedIn}>
            <Registration />
          </RestrictedRoute>
        }
      />
      <Route
        path="/water"
        element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <Water />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
