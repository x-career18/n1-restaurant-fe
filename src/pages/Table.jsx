import React, { useContext, useEffect, useState } from "react";
import AppContext from "../contexts/AppContext/AppContext";
import { notification } from "antd";
import Reservation from "./Reservation";
import createTable from "../models/Table";
import { randomInt } from "../utils/Random";

const colorStatus = {
  "1": "color-free",
  "2": "color-reservation",
  "3": "color-active",
};

const styleDefault = "ratio ratio-1x1 d-flex flex-column align-items-center justify-content-center fs-4";

const borderSelect = {
  true: "border-2",
  false: "border-0"
}

// Hiển thị sơ đồ bàn của nhà hàng được chọn
const Table = () => {
  const { tableList, refreshTableList, selectList, setSelectList } = useContext(AppContext);
  const [mode, contextHolder] = notification.useNotification(); // success info warning error
  const [filterTableStatusList, setfilterTableStatusList] = useState([]); // Lọc bàn theo yêu cầu (trống, đã đặt, đang hoạt động)
  const [modeFilter, setModeFilter] = useState("All"); // Lọc bàn theo yêu cầu (trống, đã đặt, đang hoạt động)
  const [tableMap, seTableMap] = useState([]);

  let restaurantsId = 0;

  // Lấy dữ liệu bàn của nhà hàng
  useEffect(() => {
    restaurantsId = localStorage.getItem("restaurantsId");
    let tables = [];
    if (restaurantsId == 1) {
      for (let index = 1; index <= 50; index++) {
        const item = createTable({
          tableId: index,
          image: "/table/CN_6.png",
          status: randomInt(3, 1),
          floor: '1',
          tablenumber: `Bàn số ${index}`,
          numberSeat: "6",
          shape: "Vuông"
        });
        tables.push(item);
      }
    }
    seTableMap(tables);
  }, []);

  useEffect(() => {
    filterStatusTable(modeFilter);
  }, [tableMap]);

  const handleChooseTable = (table) => {
    // Kiểm tra trạng thái bàn
    if (table.status !== 1) {
      openNotificationWithIcon(
        "warning",
        "Bạn chỉ được phép chọn bàn còn trống.!"
      );
      return;
    }
    // Thêm/xóa bàn vào danh sách đang chọn
    const newSelectList = selectList.filter((item) => item !== table.tableId);
    let newListSelect = [];
    if (newSelectList.length === selectList.length) {
      newListSelect = [...selectList, table.tableId];
    } else {
      newListSelect = newSelectList;
    }
    setSelectList(newListSelect);
  };

  const openNotificationWithIcon = (type, message) => {
    mode[type]({
      message: "Thông báo",
      description: message,
    });
  };

  const filterStatusTable = (status) => {
    let newList = [];
    if (status === "empty") {
      newList = tableMap.filter((e) => e.status === 1);
    } else if (status === "booked") {
      newList = tableMap.filter((e) => e.status === 2);
    } else if (status === "active") {
      newList = tableMap.filter((e) => e.status === 3);
    } else {
      newList = tableMap;
    }
    setModeFilter(status)
    setfilterTableStatusList(newList);
  }

  console.log("Table", localStorage.getItem("restaurantsId"));

  return (
    <div className="my-layout">
      {contextHolder}
      {/* Header của trang table */}
      <div className="mt-2 row mx-0 px-4 my-header">
        <div className="col my-center-vertiacal height-60">
          <h2>Xin mời chọn bàn</h2>
        </div>

        <div className="col my-center-vertiacal gap-4 justify-content-end">
          <button
            type="button"
            className="grey h-100 w-25 d-flex align-items-center justify-content-center border-0"
            onClick={() => refreshTableList()}
          >
            Refesh
          </button>
          <button
            type="button"
            className="grey h-100 w-25 d-flex align-items-center justify-content-center border-0"
            onClick={() => filterStatusTable("All")}
          >
            Tất cả
          </button>
          <button
            type="button"
            className="color-free h-100 w-25 d-flex align-items-center justify-content-center border-0"
            onClick={() => filterStatusTable("empty")}
          >
            Còn trống
          </button>
          <button
            type="button"
            className="color-reservation h-100 w-25 d-flex align-items-center justify-content-center border-0"
            onClick={() => filterStatusTable("booked")}
          >
            Đã đặt
          </button>
          <button
            type="button"
            className="color-active h-100 w-25 d-flex align-items-center justify-content-center border-0"
            onClick={() => filterStatusTable("active")}
          >
            Đang hoạt động
          </button>
        </div>
      </div>

      {/* Body của trang table */}
      <div className="my-content">
        <div className="row pt-2 mx-0 h-100">
          {/* Phần trái */}
          <div className="col h-100">
            <div className="row row-cols-4 mx-0 h-100 overflow-auto">
              {filterTableStatusList.map((item, index) => {
                return (
                  <div key={index} className="col pb-4">
                    <button
                      type="button"
                      className={`${styleDefault} ${colorStatus[item.status]} ${borderSelect[selectList.includes(item.tableId)]}`}
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
                      A {item.tableId}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Phần phải */}
          <div className="col-4 border-start">
            <Reservation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
