import React, { useContext, useState } from "react";
import LoginUI from "../../modelUI/Login";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Main from "../../components/Main";
// import authAPI from "../apis/authAPI";
import { FaLock, FaRightToBracket } from "react-icons/fa6";
import { RESTAURANTS } from "../../utils/LoadImage";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import { customer, manage, staff } from "../../modelUI/NavbarLink";

const Login = () => {
  const { setAuth, setModeTab } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    userpassword: Yup.string()
      .concat(Yup.string().required("Password is required"))
      .min(5, "Password must be at least 5 characters"),
  });

  const initialValues = {
    username: "",
    userpassword: "",
  };

  const navigateByRole = (role) => {
    // 1: manage, 2: staff
    if (role === "manage") {
      setModeTab(manage);
      navigate("/manage/account");
    } else if (role === "staff") {
      setModeTab(staff);
      navigate("/table");
    }

    setAuth({
      isAuthenticated: true,
      user: {
        role,
      },
    });
  };

  async function onSubmit(values) {
    try {
      setLoading(true);
      setError(null);
      // const response = await authAPI.login({
      //     username: values.username,
      //     password: values.userpassword,
      // });

      // localStorage.setItem("accessToken", response.data.data.acceptToken);

      // const userInfo = await handleLogin();
      // if (userInfo.role_id === 1) {
      //     navigate("/kiots");
      // } else {
      //     navigate("/");
      // }

      navigateByRole(values.username);
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container h-100">
      <div className="d-flex justify-content-center align-items-center h-100">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched, isSubmitting, setFieldValue }) => {
            return (
              <div className="rounded-1 border w-75 h-50">
                <div className=" row mx-0 h-100">
                  <div className="col d-none d-md-block border-end">
                    <div className="d-flex align-items-center justify-content-center w-100 h-100">
                      <img
                        src={`${RESTAURANTS[0]}`}
                        alt={`${RESTAURANTS[0]}`}
                        style={{
                          width: "70%",
                          height: "70%",
                        }}
                      />
                    </div>
                  </div>

                  <div className="col p-4 h-100">
                    <Form className="form-horizontal h-100  position-relative">
                      {LoginUI.map((item) => {
                        return (
                          <div key={item.fieldName} className="form-group col">
                            <label className="fs-4 ">{item.label}</label>
                            <Field
                              name={item.fieldName}
                              type={item.type ? item.type : "text"}
                              placeholder={`Enter ${item.label}`}
                              className={
                                "form-control my-3" +
                                (errors[item.fieldName] &&
                                touched[item.fieldName]
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name={item.fieldName}
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        );
                      })}

                      <div className="row mt-5 p-1">
                        <div className="col d-flex justify-content-start align-items-center">
                          <div className="custom-control custom-switch switch-success">
                            <input
                              type="checkbox"
                              className="custom-control-input me-3"
                              id="customSwitchSuccess"
                            />
                            <label
                              className="custom-control-label  fs-6"
                              htmlFor="customSwitchSuccess"
                            >
                              Remember me
                            </label>
                          </div>
                        </div>
                        <div className="col text-right d-flex justify-content-center align-items-center">
                          <FaLock className="dripicons-lock me-3" />
                          <a href="auth-recover-pw.html" className=" fs-6">
                            Forgot password?
                          </a>
                        </div>
                      </div>
                      {error && <p className="text-danger">{error}</p>}
                      <button
                        className="btn btn-outline-primary btn-round btn-block waves-effect waves-light position-absolute bottom-0 start-50 translate-middle-x fs-4 "
                        type="submit"
                      >
                        {loading ? "Loading" : "Login"}
                        <FaRightToBracket className="fas fa-sign-in-alt ms-3" />
                      </button>
                    </Form>
                  </div>
                </div>
              </div>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
