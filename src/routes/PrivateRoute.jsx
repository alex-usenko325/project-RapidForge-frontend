import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({}) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
