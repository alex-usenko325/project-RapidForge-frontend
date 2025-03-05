import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import Layout from "./components/Layout/Layout";
// import Home from "./pages/Home/Home";
// import Registration from "./pages/Registration/Registration";
// import Login from "./pages/Login/Login";
// import PrivateRoute from "./routes/PrivateRoute";
// import RestrictedRoute from "./routes/RestrictedRoute";
// import { refreshUser } from "./redux/auth/operations";

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isRefreshing = useSelector((state) => state.auth.isRefreshing);

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
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
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
    </Routes>
  );
};

export default App;
