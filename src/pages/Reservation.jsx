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
import { getIdByRestaurantName, getIdByTableName } from "../utils/TableUtil";
import tableAPI from "../apis/tableAPI";
import TableContext from "../contexts/TableContext/TableContext";
import createTable from "../models/Table";
import OTPModal from "../modals/OTPModal";
import OtpAPI from "../apis/OTPAPI";

const Reservation = () => {
  const { restaurants, reservation, foodOrder, setFoodOrder } =
    useContext(AppContext);
  const { getAllTableByRestaurant, seTableMap } =
    useContext(TableContext);
  const [mode, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalOTPShow, setModalOTPShow] = useState(false);
  const [reservationModel, setReservationModel] = useState({});
  const [checkInTime, setCheckInTime] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const restaurantName = searchParams.get(param.restaurants);
  const selectTable = searchParams.get(param.selectTable)?.split(",");
  const restaurantsId = getIdByRestaurantName(restaurants, searchParams.get(param.restaurants));

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

  async function onSubmit(fields, { setStatus, setSubmitting, resetForm }) {
    if (!checkSelectTable(selectTable) || !checkTime(checkInTime)) {
      setSubmitting(false);
      return;
    }

    const restaurantId = getIdByRestaurantName(restaurants, restaurantName);
    const listTableName = selectTable.map(Number);

    // Kiểm tra bàn
    const tableList = await checkTableFree(restaurantId);
    if (!tableList || tableList.length == 0) {
      setSubmitting(false);
      return;
    }

    const filterTableFree = tableList.filter((item) => item.status == 1);
    let isTableNotFree = [];
    let listTableId = [];
    for (let index = 0; index < listTableName.length; index++) {
      const found = filterTableFree.find(
        (element) => element.name == listTableName[index]
      );
      if (!found) {
        isTableNotFree.push(listTableName[index]);
        break;
      }
      listTableId.push(found._id);
    }

    if (isTableNotFree.length > 0) {
      openNotificationWithIcon(
        "info",
        `Bàn (${isTableNotFree.toString()}) bạn đặt không trống.!`
      );
      return;
    }

    // Lấy thông tin của foodOrder
    let foodOrderList = [];
    for (let index = 0; index < foodOrder.length; index++) {
      const { item, quantity, costPerUnit, discount } = foodOrder[index];

      foodOrderList.push({
        item,
        quantity,
        costPerUnit,
        discount,
      });
    }

    // Tính expiredTime từ checkInTime
    const expiredTime = checkInTime.add(30, "minutes");

    // Tạo thông tin để gửi
    const newReservation = {
      fullname: fields.fullName,
      phoneNo: fields.phone,
      restaurantId: restaurantId,
      tableId: listTableId,
      tableCount: listTableName.length,
      order: foodOrderList,
      checkinTime: checkInTime.$d,
      expiredTime: expiredTime.$d,
    };
    
    await OtpAPI.create(fields.phone);
    setReservationModel(newReservation);
    setModalOTPShow(true);
    
    searchParams.delete(param.selectTable);
    setSearchParams(searchParams);
    resetForm();
    setLoading(false);
    setSubmitting(false);
    setFoodOrder([]);
    setCheckInTime(null);
  }

  const handleOTP = async () => {
    await createReservation(reservationModel);
    await getAllTableByRestaurantID();
  }

  // Call API
  const createReservation = async (model) => {
    const response = await reservationAPI.create(model);

    // Check response
    if (response.data.success) {
      // Thông báo thành công
      openNotificationWithIcon("success", "Bạn đã đặt bàn thành công.!");
    } else {
      // Thông báo thất bại
      openNotificationWithIcon(
        "error",
        "Đặt bàn không thành công. " + response.data.message
      );
    }

    setLoading(false);
  };

  const getAllTableByRestaurantID = async () => {
    const tableList = await getAllTableByRestaurant(restaurantsId);
    let tables = [];
    for (let index = 0; index < tableList.length; index++) {
      const item = createTable({
        tableId: tableList[index]._id,
        tableName: tableList[index].name,
        image: "/table/" + tableList[index].images,
        status: tableList[index].status,
        restaurantId: tableList[index].restaurantId,
      });
      item["selected"] = false;
      tables.push(item);
    }
    seTableMap(tables);
  };

  const checkTableFree = async (restaurantId) => {
    try {
      const response = await tableAPI.getByRestaurantId(restaurantId);

      if (response.data.success) {
        return response.data.data;
      }
    } catch (error) {
      openNotificationWithIcon("error", "Hệ thống hiện không hoạt động.");
      return null;
    }
  };

  const checkSelectTable = (selectTable) => {
    if (selectTable == null || selectTable == "") {
      openNotificationWithIcon("warning", "Bạn nên chọn ít nhất 1 bàn.!");
      setLoading(false);
      return false;
    }
    return true;
  };

  const checkTime = (time) => {
    if (time == null || time == "") {
      openNotificationWithIcon("warning", "Bạn nên chọn giờ đặt bàn.!");
      setLoading(false);
      return false;
    }
    return true;
  };

  const openNotificationWithIcon = (type, message) => {
    mode[type]({
      message: "Thông báo",
      description: message,
    });
  };

  const onChange = (value, dateString) => {
    setCheckInTime(value);
  };

  const onOk = (value) => {
    console.log("onOk: ", value);
    setCheckInTime(value);
  };

  const handleOrder = () => {
    setModalShow(true);
  };

  // console.log("Reservation");

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
            <label className="col px-0 fs-5 ">
              {" "}
              {searchParams.get(param.selectTable) ?? ""}
            </label>
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
                          height: 40,
                        }}
                      >
                        <label className="col fs-5 ">
                          {capitalizeFirstLetter(item.label)}
                        </label>
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
                      size={"large"}
                      showTime
                      value={checkInTime}
                      onChange={onChange}
                      onOk={onOk}
                      placeholder={"Enter time"}
                      status={errors.time ? "error" : ""}
                    />
                  </div>

                  <div key={"food"} className="form-group row me-2 mt-2">
                    <label className="col fs-5 ">Thực đơn</label>
                    {foodOrder?.length > 0 ? (
                      <FoodOrder isModal={true} />
                    ) : (
                      <button
                        style={{
                          height: 40,
                        }}
                        type="button"
                        className="grey col d-flex align-items-center justify-content-center border-0"
                        onClick={handleOrder}
                      >
                        Chọn thực đơn
                      </button>
                    )}
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
        order={() => { }}
      />

      <OTPModal
        show={modalOTPShow}
        onHide={() => setModalOTPShow(false)}
        phoneNo={reservationModel.phoneNo}
        isCanel={() => { }}
        isDone={handleOTP}
      />

    </div>
  );
};

export default Reservation;
