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
  const [modeTab, setModeTab] = useState({});
  const navigate = useNavigate();

  //   1. Call API /me => userInfo
  //   2. Update auth state
  // const handleLogin = async () => {
  //     try {
  //         const response = await authAPI.authInfo();
  //         const data = response.data;
  //         setAuth({
  //             isAuthenticated: true,
  //             user: data.data.userInfo,
  //         });
  //         return data.data.userInfo
  //     } catch (error) {
  //         console.log(error);
  //     }
  // };

  // const handleLogout = () => {
  //     setAuth({
  //         isAuthenticated: false,
  //         user: {},
  //     });
  // };

  // useEffect(() => {
  //     const accessToken = localStorage.getItem("accessToken");
  //     // Call API /me => check token => user, isAuthenticated
  //     if (accessToken) {
  //         handleLogin();
  //     }
  // }, []);

  const handleLogin = async () => {
    try {
      const response = await authAPI.authInfo();
      const data = response.data;
      setAuth({
        isAuthenticated: true,
        user: data.data.userInfo,
      });
      return data.data.userInfo;
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    setAuth({
      isAuthenticated: false,
      user: {},
    });
    // localStorage.removeItem("accessToken");
    setModeTab(customer);
    navigate("/");
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    // Call API /me => check token => user, isAuthenticated
    if (accessToken) {
      handleLogin();
    } else {
      setModeTab(customer);
    }

  }, []);

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
