import React, { useState } from 'react'
import { capitalizeFirstLetter } from "../utils/CapitalizeFirstLetter";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import createTable from '../models/Table';
import { FormCheckReservation } from '../modelUI/FormCheckReservation';
import { randomInt } from '../utils/Random';

const showInfoHistoryReservation = {
    "Bàn đặt số": "[tableId]",
    "Tổng số bàn": "totalCountTable",
    "Giờ đặt bàn": "checkinTime",
    "Tên nhà hàng": "restaurantName",
    "Trạng thái": "status"
}

const CheckReservation = () => {
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);

    const initialValues = {
        email: "",
        phone: "",
    };

    const validationSchema = Yup.object().shape({
        phone: Yup.number().required("Phone is required"),
        email: Yup.string().required("Email is required"),
    });

    function onSubmit(fields, { setStatus, setSubmitting, resetForm }) {
        const request = {
            email: fields.email,
            phone: fields.phone
        }
        console.log("request check reservation", request);

        setSubmitting(true);

        setHistory([
            createTable({
                restaurantName: "Cơ sở số 1",
                tableId: [1],
                totalCountTable: [1].length,
                checkinTime: "2023-10-25 14:30:38",
                status: "Đã check in",
            }),
            createTable({
                restaurantName: "Cơ sở số 2",
                tableId: [1, 2, 3],
                totalCountTable: [1, 2, 3].length,
                checkinTime: "2023-10-25 14:30:38",
                status: "Chờ check in",
            }),
            createTable({
                restaurantName: "Cơ sở số 3",
                tableId: [10, 20, 30],
                totalCountTable: [10, 20, 30].length,
                checkinTime: "2023-10-25 14:30:38",
                status: "Đã check in",
            }),
        ]);

        setSubmitting(false);
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
                        <Form className='row justify-content-center '>
                            {FormCheckReservation.map((item) => {
                                return (
                                    <div
                                        key={item.fieldName}
                                        className="form-group row mx-0 w-75 mt-2"
                                    >
                                        <label className="col-2 fs-5 ">{item.label}</label>
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

                            <div className="form-group text-end mt-3 w-75">
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
                    console.log(item)
                    return (
                        <div key={index}>
                            {buildItemHistory("Tên nhà hàng", item.restaurantName)}
                            {buildItemHistory("Đặt bàn số", item.tableId.toString())}
                            {buildItemHistory("Tổng số bàn", item.totalCountTable)}
                            {buildItemHistory("Giờ đặt bàn", item.checkinTime)}
                            {buildItemHistory("Trạng thái", item.status)}
                            <hr />
                        </div>
                    )
                })
            }
        </div>
    );
}

const buildItemHistory = (label, value) => {
    return <div className="form-group row w-75 mt-2 mx-0">
        <label className="col-2 fs-5 "> {capitalizeFirstLetter(label)}</label>
        <label className="col fs-5 "> {value ?? "Chưa có thông tin"}</label>
    </div>
};

export default CheckReservation;