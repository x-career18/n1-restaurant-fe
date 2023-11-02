import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import authAPI from "../../apis/authAPI";
import { customer, manage, staff } from "../../modelUI/NavbarLink";
import { useNavigate } from "react-router-dom";

const AuthState = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: {},
  });
  const [modeTab, setModeTab] = useState(customer);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await authAPI.authInfo();
      const data = response.data;
      if (data) {
        setAuth({
          isAuthenticated: true,
          user: data.data,
        });
        navigateByRole(data.data.role);
      }
    } catch (error) {
      console.log(error);
      handleLogout();
    }
  };

  const handleLogout = () => {
    setAuth({
      isAuthenticated: false,
      user: {},
    });
    localStorage.removeItem("x-access-token");
    setModeTab(customer);
    navigate("/");
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("x-access-token");
    if (accessToken) {
      handleLogin();
    } else {
      setModeTab(customer);
    }

  }, []);

  const navigateByRole = (role) => {
    if (role == 1) {
      setModeTab(manage);
    } else if (role == 2) {
      setModeTab(staff);
    } else {
      setModeTab(customer);
    }
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        auth, setAuth,
        handleLogin,
        handleLogout,
        modeTab,
        setModeTab,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
