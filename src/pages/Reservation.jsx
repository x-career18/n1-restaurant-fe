import React, { useContext, useState } from "react";
import AppContext from "../contexts/AppContext/AppContext";
import * as Yup from "yup";
import TableDetail from "../modelUI/Table";
import { capitalizeFirstLetter } from "../utils/CapitalizeFirstLetter";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FormOrderTable } from "../modelUI/FormOrderTable";
import { useNavigate } from "react-router-dom";
import { DatePicker, Input } from "antd";
import MenuModal from "../modals/MenuModal";
import FoodOrder from "./food/FoodOrder";
const { TextArea } = Input;

const Reservation = () => {
  const { reservation, setReservation, selectList, setSelectList, foodOrder, setFoodOrder } =
    useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    fullName: "",
    gender: "",
    phone: "",
    time: "",
    email: "",
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string(),
    gender: Yup.string(),
    phone: Yup.string().required("Phone is required"),
    time: Yup.string().required("Time is required"),
    email: Yup.string().required("Email is required"),
  });

  function onSubmit(fields, { setStatus, setSubmitting, resetForm }) {
    setSelectList([]);
    setReservation({});
    navigate("/");
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

  const onChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
    console.log("Time $d: ", value.$d);
  };

  const onOk = (value) => {
    console.log("onOk: ", value);
  };

  const handleOrder = () => {
    setModalShow(true);
  };

  TableDetail.tableId = selectList.sort().join(", ");
  console.log("Reservation", foodOrder.length);
  return (
    <div className="container mt-5">
      <h1>Thông tin đặt bàn</h1>
      <hr />
      {/* Thông tin của nhà hàng */}
      <div className="form-group row   mt-2">
        <label className="col fs-5 ">
          {" "}
          {capitalizeFirstLetter("Tên nhà hàng")}
        </label>
        <label className="col fs-5 "> {reservation.restaurantId}</label>
      </div>
      {/* Thông tin của bàn ăn */}
      {Object.keys(TableDetail).map((key, index) => {
        return (
          <div key={index} className="form-group row   mt-2">
            <label className="col fs-5 "> {capitalizeFirstLetter(key)}</label>
            <label className="col fs-5 "> {TableDetail[key]}</label>
          </div>
        );
      })}
      <hr />
      <div className="fs-4 fw-bold">Thông tin liên hệ</div>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting, setFieldValue }) => {
          return (
            <Form>
              {FormOrderTable.map((item) => {
                return (
                  <div
                    key={item.fieldName}
                    className="form-group row me-2  mt-2"
                    style={{
                      height: 40
                    }}
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

              <div key={"time"} className="form-group row me-2 mt-2">
                <label className="col fs-5 ">Check-in time</label>
                <DatePicker
                  className="col"
                  size={'large'}
                  showTime
                  onChange={onChange}
                  onOk={onOk}
                  placeholder={"Enter time"}
                  status={errors.time ? "error" : ""} />
              </div>

              <div key={"food"} className="form-group row me-2 mt-2">
                <label className="col fs-5 ">Order</label>
                {foodOrder?.length > 0 ? <FoodOrder isModal={true} />
                  : <button
                    style={{
                      height: 40
                    }}
                    type="button"
                    className="grey col d-flex align-items-center justify-content-center border-0"
                    onClick={handleOrder}
                  >
                    Order
                  </button>
                }
              </div>

              <div className="form-group text-end m-3 ">
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
      <MenuModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        tableName={reservation.restaurantId}
        isCanel={() => setFoodOrder([])}
      />
    </div>

  );
};

export default Reservation;
