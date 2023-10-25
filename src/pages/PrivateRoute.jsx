import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext/AuthContext";

const PrivateRoute = ({ component: Component }) => {
  const { auth } = useContext(AuthContext);
  const { isAuthenticated } = auth;

  if (isAuthenticated) {
    return <Component />;
  }
  
  return <Navigate to="/login" />;
};

export default PrivateRoute;
