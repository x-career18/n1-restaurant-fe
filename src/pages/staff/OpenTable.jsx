import React, { useContext, useEffect, useState } from "react";
import { notification } from "antd";
import createTable from "../../models/Table";
import tableAPI from "../../apis/tableAPI";
import AuthContext from "../../contexts/AuthContext/AuthContext";
import ConfirmOpenTable from "../../modals/ConfirmOpenTable";
import dayjs from "dayjs";
import reservationAPI from "../../apis/reservationAPI";

const colorStatus = {
  1: "color-free",
  0: "color-reservation",
  2: "color-active",
};

const styleDefault =
  "ratio ratio-1x1 d-flex flex-column align-items-center justify-content-center fs-4";

const borderSelect = {
  true: "border-2",
  false: "border-0",
};

// Hiển thị sơ đồ bàn của nhà hàng được chọn
const OpenTable = () => {
  const [mode, contextHolder] = notification.useNotification(); // success info warning error
  const { auth } = useContext(AuthContext);
  const [modalShow, setModalShow] = useState(false);
  const [selectTable, setSelectTable] = useState([]);
  const [tableActiveList, settableActiveList] = useState([]);

  // tìm restaurantsId để lấy dữ liệu bàn của nhà hàng
  useEffect(() => {
    getTableFreeByRestaurantID();
  }, []);

  const getTableFreeByRestaurantID = async () => {
    try {
      const response = await tableAPI.getAllByRestaurantIdAndStatus(
        auth.user.restaurantId,
        1
      );
      if (response.data.success) {
        const tableList = response.data.data;
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
        settableActiveList(tables);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleChooseTable = (table) => {
    // Kiểm tra trạng thái bàn
    if (table.status !== 1) {
      openNotificationWithIcon(
        "warning",
        "Bạn chỉ được phép chọn bàn còn trống.!"
      );
      return;
    }

    table.selected = !table.selected;

    let newSelectTable = [];
    for (let index = 0; index < tableActiveList.length; index++) {
      const element = tableActiveList[index];
      if (element.selected == true) newSelectTable.push(element);
    }
    setSelectTable(newSelectTable);
  };

  const handleOpenTable = async () => {
    if (selectTable.length == 0) {
      openNotificationWithIcon("warning", `Bạn phải chọn ít nhất 1 bàn.!`);
      return;
    }

    let tableId = [];
    for (let index = 0; index < selectTable.length; index++) {
      const element = selectTable[index];
      tableId.push(element.tableId);
    }

    const currentTime = dayjs();

    // Tạo thông tin để gửi
    const newReservation = {
      fullname: auth.user.fullName,
      phoneNo: 1,
      restaurantId: auth.user.restaurantId,
      tableId: tableId,
      tableCount: tableId.length,
      order: [],
      checkinTime: currentTime,
      expiredTime: currentTime,
    };
    const response = await reservationAPI.create(newReservation);
    // Check response
    if (response.data.success) {
      // Thông báo thành công
      openNotificationWithIcon("info", `Bàn (${tableId.toString()}) đã mở.!`);
      await reservationAPI.checkInReservation(response.data.data._id);
    } else {
      // Thông báo thất bại
      openNotificationWithIcon(
        "error",
        "Mở bàn không thành công. " + response.data.message
      );
    }

    getTableFreeByRestaurantID();
  };

  const openNotificationWithIcon = (type, message) => {
    mode[type]({
      message: "Thông báo",
      description: message,
    });
  };

  return (
    <>
      {contextHolder}
      <div className="container">
        <div
          className="mt-2 row align-items-center"
          style={{
            height: 60,
          }}
        >
          <h2 className="col px-4">
            {selectTable.length == 0
              ? "Chọn bàn để mở"
              : "Bàn đang chọn: " +
                selectTable.map((item) => item.tableName).toString()}
          </h2>
          <button
            className="rounded-1 border-1 fs-4 col-2 text-my-color-navbar"
            style={{
              backgroundColor: "#FCDAB4",
              borderColor: "#F6921E",
            }}
            onClick={() => {
              setModalShow(true);
            }}
          >
            Mở bàn
          </button>
        </div>
        <div className="row row-cols-3 row-cols-lg-4">
          {tableActiveList.map((item, index) => {
            return (
              <div key={index} className="col pb-4">
                <button
                  type="button"
                  className={`${styleDefault} ${colorStatus[item.status]} ${
                    borderSelect[item.selected]
                  }`}
                  onClick={() => handleChooseTable(item)}
                >
                  <img
                    src={item.image}
                    alt={item.image}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                  A {item.tableName}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <ConfirmOpenTable
        show={modalShow}
        onHide={() => setModalShow(false)}
        table={selectTable}
        openTable={handleOpenTable}
      />
    </>
  );
};

export default OpenTable;
