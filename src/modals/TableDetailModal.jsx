import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import BootstrapModal from "react-bootstrap/Modal";
import * as Yup from "yup";
import { FormOrderTable } from "../modelUI/FormOrderTable";
import TableDetail from "../models/TableDetail";
import { capitalizeFirstLetter } from "../utils/CapitalizeFirstLetter";

export const TableDetailModal = ({ show, handleClose, tableId }) => {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    fullName: "",
    gender: "",
    phone: "",
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string(),
    gender: Yup.string(),
    phone: Yup.string().required("Phone is required"),
  });

  function onSubmit(fields, { setStatus, setSubmitting, resetForm }) {
    // if (isAddMode) {
    //   createCustomer(fields, setSubmitting, resetForm);
    //   onUpdateCustomer();
    // } else {
    //   updateCustomer(fields, setSubmitting);
    //   onUpdateCustomer();
    // }
  }

  //   async function createCustomer(fields, setSubmitting, resetForm) {
  //     resetForm();
  //     const newCustomer = {
  //       ...fields,
  //       kiot_id: user.kiot_id,
  //       username: user.username,
  //       gender: fields.gender === "male" ? 1 : fields.gender === "female" ? 2 : 3,
  //     };
  //     setLoading(true);
  //     await customerAPI
  //       .create(newCustomer)
  //       .then(() => {
  //         onUpdateCustomer({
  //           status: 1,
  //           message: "Customer is added successfully!",
  //         });
  //         handleClose();
  //       })
  //       .catch((error) => {
  //         setSubmitting(false);
  //         setLoading(false);
  //         onUpdateCustomer({ status: 0, message: error.response.data.error });
  //         handleClose();
  //         console.log(error.response.data.error);
  //       })
  //       .finally(setLoading(false));
  //   }
  TableDetail.tablenumber = tableId.sort().join(", ");

  return (
    <BootstrapModal show={show} onHide={handleClose} centered size="lg">
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>Thông tin bàn</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        {
          Object.keys(TableDetail).map((key, index) => {
            return (
              <div key={index} className="form-group row w-75 mt-2">
                <label className="col fs-5 "> {capitalizeFirstLetter(key)}</label>
                <label className="col fs-5 "> {TableDetail[key]}</label>
              </div>
            );
          })}
          <hr />
        <div className="fs-4 fw-bold">
          Thông tin liên hệ
        </div>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {
            ({ errors, touched, isSubmitting, setFieldValue }) => {
              return (
                <Form>
                  {FormOrderTable.map((item) => (
                    <div key={item.fieldName} className="form-group row w-75 mt-2">
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
                  ))}

                  <div className="form-group text-center mt-3">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="btn btn-secondary me-2"
                    >
                      Canel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary"
                    >
                      {isSubmitting && (
                        <span className="spinner-border spinner-border-sm mr-1"></span>
                      )}
                      Đặt bàn
                    </button>
                  </div>
                </Form>
              );
            }}
        </Formik>
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
        <div className="container">
          <li>
            Nếu khách hàng không checkin quá thời gian checkin dự kiến 30 phút, yêu cầu đặt bàn sẽ tự động hủy.
          </li>
          <li>
            Nếu khách hàng không chọn bàn theo mong muốn mà chọn số lượng bàn cần đặt, hệ thống tự động xếp số bàn còn trống cho khách. Nếu không đủ số lượng bàn, hệ thống thông báo lại cho khách hàng
          </li>
        </div>

      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};
