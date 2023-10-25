import React, { useContext, useState } from "react";
import AppContext from "../contexts/AppContext/AppContext";
import * as Yup from "yup";
import { capitalizeFirstLetter } from "../utils/CapitalizeFirstLetter";
import { Field, Form, Formik } from "formik";
import { FormOrderTable } from "../modelUI/FormOrderTable";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DatePicker, Input, notification } from "antd";
import MenuModal from "../modals/MenuModal";
import FoodOrder from "./food/FoodOrder";
import reservationAPI from "../apis/reservationAPI";
import { param } from "../contexts/QueryParam";
import { getIdByRestaurantName } from "../utils/TableUtil";
import dayjs from "dayjs";

const Reservation = () => {
  const { restaurants, reservation, setReservation, selectList, setSelectList, foodOrder, setFoodOrder } =
    useContext(AppContext);
  const [mode, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const restaurantName = searchParams.get(param.restaurants);
  const selectTable = searchParams.get(param.selectTable)?.split(",");

  const initialValues = {
    fullName: "",
    phone: "",
    email: "",
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string(),
    phone: Yup.number().required("Phone is required"),
    email: Yup.string(),
  });

  function onSubmit(fields, { setStatus, setSubmitting, resetForm }) {
    setLoading(true);
    setSubmitting(true);

    // Lấy thông tin của foodOrder
    let foodOrderList = [];
    for (let index = 0; index < foodOrder.length; index++) {
      const {
        foodName,
        count,
        price,
        discount,
      } = foodOrder[index];

      foodOrderList.push({
        "item": foodName,
        "quantity": count,
        "discount": discount,
        "total": price * count
      });
    }

    // Tính expiredTime từ checkInTime
    const expiredTime = checkInTime.add(30, 'minutes');

    // Kiểm tra danh sách bàn
    if (selectTable == null || selectTable == "") {
      openNotificationWithIcon(
        "warning",
        "Bạn nên chọn ít nhất 1 bàn.!"
      );
      setLoading(false);
      setSubmitting(false);
      return;
    }

    const listTableId = selectTable.map(Number);

    // Tạo thông tin để gửi
    const newReservation = {
      fullname: fields.fullName,
      phoneNo: fields.phone,
      restaurantId: getIdByRestaurantName(restaurants, restaurantName),
      tableId: listTableId,
      tableCount: listTableId.length,
      order: foodOrderList,
      checkinTime: checkInTime.$d,
      expiredTime: expiredTime.$d,
    }
    console.log("newReservation", newReservation);

    searchParams.delete(param.selectTable);
    setSearchParams(searchParams);
    resetForm();
    setLoading(false);
    setSubmitting(false);
    setFoodOrder([]);
    setCheckInTime(null);
  }

  // Call API
  const createReservation = async (model) => {
    const response = await reservationAPI.create(model);

    // Check response
    if (response.success) {
      // Thông báo thành công
      openNotificationWithIcon(
        "success",
        "Bạn đã đặt bàn thành công.!"
      );

    } else {
      // Thông báo thất bại
      openNotificationWithIcon(
        "error",
        "Đặt bàn không thành công.!"
      );
    }
    setLoading(false);
  }

  // reset toàn bộ
  const handleReset = () => {
    setSelectList([]);
    setReservation({});
    navigate("/");
  }

  const openNotificationWithIcon = (type, message) => {
    mode[type]({
      message: "Thông báo",
      description: message,
    });
  };

  const onChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    // console.log("Formatted Selected Time: ", dateString);
    // console.log("Time $d: ", value.$d);
    let expiredTime = value.add(30, 'minutes');
    console.log("expiredTime", expiredTime);
    setCheckInTime(value);
  };

  const onOk = (value) => {
    console.log("onOk: ", value);
    setCheckInTime(value.$d)
  };

  const handleOrder = () => {
    setModalShow(true);
  };

  // console.log("Reservation", foodOrder.length);

  return (
    <div className="container pt-2 h-100">
      {contextHolder}
      <div className="my-layout">
        <div className="my-content">
          <h1>Thông tin đặt bàn</h1>
          <hr />
          {/* Thông tin của nhà hàng */}
          <div className="form-group mx-0 row mt-2">
            <label className="col px-0 fs-5 ">
              {capitalizeFirstLetter("Tên nhà hàng")}
            </label>
            <label className="col px-0 fs-5 "> {restaurantName}</label>
          </div>
          <div className="form-group mx-0 row mt-2">
            <label className="col px-0 fs-5 ">
              {capitalizeFirstLetter("Bàn số")}
            </label>
            <label className="col px-0 fs-5 "> {selectTable}</label>
          </div>
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
                        <label className="col fs-5 ">{capitalizeFirstLetter(item.label)}</label>
                        <Field
                          name={item.fieldName}
                          type={item.type ? item.type : "text"}
                          placeholder={`Nhập ${item.label}`}
                          className={
                            "form-control col" +
                            (errors[item.fieldName] && touched[item.fieldName]
                              ? " is-invalid"
                              : "")
                          }
                        />
                      </div>
                    );
                  })}

                  <div key={"time"} className="form-group row me-2 mt-2">
                    <label className="col fs-5 ">Thời gian đặt</label>
                    <DatePicker
                      className="col"
                      size={'large'}
                      showTime
                      value={checkInTime}
                      onChange={onChange}
                      onOk={onOk}
                      placeholder={"Enter time"}
                      status={errors.time ? "error" : ""} />
                  </div>

                  <div key={"food"} className="form-group row me-2 mt-2">
                    <label className="col fs-5 ">Thực đơn</label>
                    {foodOrder?.length > 0 ? <FoodOrder isModal={true} />
                      : <button
                        style={{
                          height: 40
                        }}
                        type="button"
                        className="grey col d-flex align-items-center justify-content-center border-0"
                        onClick={handleOrder}
                      >
                        Chọn thực đơn
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
        </div>
      </div>

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
