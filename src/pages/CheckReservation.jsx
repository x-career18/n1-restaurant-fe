import React, { useState } from 'react'
import { capitalizeFirstLetter } from "../utils/CapitalizeFirstLetter";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import createTable from '../models/Table';
import { FormCheckReservation } from '../modelUI/FormCheckReservation';
import { randomInt } from '../utils/Random';

const CheckReservation = () => {
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);

    const initialValues = {
        email: "",
        phone: "",
    };

    const validationSchema = Yup.object().shape({
        phone: Yup.string().required("Phone is required"),
        email: Yup.string().required("Email is required"),
    });

    function onSubmit(fields, { setStatus, setSubmitting, resetForm }) {
        console.log("OnSubmit")
        setHistory([
            createTable({
                tableId: [1],
                image: "/table/CN_6.png",
                status: randomInt(3, 1),
                floor: '1',
                tablenumber: "Bàn số 0",
                numberSeat: "6",
                shape: "Vuông"
            }),
            createTable({
                tableId: [2,3,4],
                image: "/table/CN_6.png",
                status: randomInt(3, 1),
                floor: '1',
                tablenumber: "Bàn số 1",
                numberSeat: "6",
                shape: "Vuông"
            })
        ]);
    }

    return (
        <div className="container mt-2">
            <h1>Tra cứu thông tin đặt bàn</h1>
            <hr />
            {/* Form nhập thông tin tra cứu */}
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ errors, touched, isSubmitting, setFieldValue }) => {
                    return (
                        <Form>
                            {FormCheckReservation.map((item) => {
                                return (
                                    <div
                                        key={item.fieldName}
                                        className="form-group row w-75 mt-2"
                                    >
                                        <label className="col fs-5 ">{item.label}</label>
                                        <Field
                                            name={item.fieldName}
                                            type={item.type ? item.type : "text"}
                                            placeholder={`Enter ${item.label}`}
                                            className={
                                                "form-control col" +
                                                (errors[item.fieldName] && touched[item.fieldName]
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

                            <div className="form-group text-center mt-3 ">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn btn-primary"
                                >
                                    {isSubmitting && (
                                        <span className="spinner-border spinner-border-sm mr-1"></span>
                                    )}
                                    Tra cứu
                                </button>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
            <hr />
            {/* Hiển thị kết quả trả về */}
            {history.length !== 0 &&
                history.map((item, index) => {
                    return (
                        <div key={index}>
                            {
                                buildItemHistory(item)
                            }
                            <hr />
                        </div>
                    )
                })
            }
        </div>
    );
}

const buildItemHistory = (item) => {
    return Object.keys(item).map((key, index) => {
        return (
            <div key={index} className="form-group row w-75 mt-2">
                <label className="col fs-5 "> {capitalizeFirstLetter(key)}</label>
                <label className="col fs-5 "> {item[key]}</label>
            </div>
        );
    })
};

export default CheckReservation;