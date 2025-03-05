import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RestrictedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return !isLoggedIn ? children : <Navigate to="/water" />;
};

RestrictedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RestrictedRoute;
