import React, { useState } from 'react'
import RegisterUI from '../../modelUI/Register';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import Main from '../../components/Main';
// import authAPI from "../apis/authAPI";
import {
    FaLock,
    FaRightToBracket,
} from "react-icons/fa6";


const Register = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Username is required"),
        userpassword: Yup.string()
            .concat(Yup.string().required("Password is required"))
            .min(5, "Password must be at least 5 characters"),
        full_name: Yup.string().required("Full_name is required"),
        conf_password: Yup.string().required("Confirm password is required"),
        phoneNo: Yup.string().required("PhoneNo is required"),
        address: Yup.string().required("Address is required"),
    });

    const initialValues = {
        username: "",
        full_name: "",
        useremail: "",
        userpassword: "",
        conf_password: "",
        phoneNo: "",
        address: "",
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
            navigate("/");
        } catch (error) {
            console.log(error);
            setError(error.response.data.error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Main>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                // validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ errors, touched, isSubmitting, setFieldValue }) => {
                    return (
                        <div className='rounded-1 border w-75 h-75'>
                            <div className=' row h-100'>
                                <div className='col d-none d-md-block border-end'>
                                    <div className='d-flex align-items-center justify-content-center w-100 h-100'>
                                        <img
                                            src="/loginBg.png"
                                            alt="/loginBg.png"
                                            style={{
                                                width: '70%',
                                                height: '70%'
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className='col align-items-center justify-content-start p-4 h-100'>
                                    <div className='row'>
                                        <div className="text-center auth-logo-text">
                                            <h4 className="mb-3 mt-2">
                                                Free Register for Brother
                                            </h4>
                                            <p className="text-muted">
                                                Get your free Brother account now.
                                            </p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <Form className="form-horizontal auth-form h-100 position-relative">
                                            {RegisterUI.map((item) => {
                                                return (<div key={item.fieldName} className="form-group col">
                                                    <label className='fs-6 '>{item.label}</label>
                                                    <Field
                                                        name={item.fieldName}
                                                        type={item.type ? item.type : "text"}
                                                        placeholder={`Enter ${item.label}`}
                                                        className={
                                                            "form-control my-2" +
                                                            (errors[item.fieldName] &&
                                                                touched[item.fieldName]
                                                                ? " is-invalid"
                                                                : "")
                                                        }
                                                    />
                                                    {/* <ErrorMessage
                                                        name={item.fieldName}
                                                        component="div"
                                                        className="invalid-feedback"
                                                    /> */}
                                                </div>);
                                            })}
                                           
                                            {error && <p className="text-danger">{error}</p>}
                                            <button
                                                className="btn btn-outline-primary btn-round btn-block waves-effect waves-light position-absolute top-100 start-50 translate-middle-x fs-4 mt-5"
                                                type="submit"
                                            >
                                                {loading ? "Loading" : "Register"}
                                                <FaRightToBracket className="fas fa-sign-in-alt ms-3" />
                                            </button>
                                        </Form>
                                    </div>

                                </div>
                            </div>

                        </div>
                    );
                }}
            </Formik>
        </Main>
    )
}

export default Register;