import React, { useContext, useEffect, useState } from "react";
import AppContext from "../contexts/AppContext/AppContext";
import { notification } from "antd";
import Reservation from "./Reservation";
import createTable from "../models/Table";
import { randomInt } from "../utils/Random";
import { useSearchParams } from "react-router-dom";
import { param } from "../contexts/QueryParam";
import TableState from "../contexts/TableContext/TableState";

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
  const { restaurants } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [mode, contextHolder] = notification.useNotification(); // success info warning error
  const [filterTableStatusList, setfilterTableStatusList] = useState([]); // Lọc bàn theo yêu cầu (trống, đã đặt, đang hoạt động)
  const [modeFilter, setModeFilter] = useState("All"); // Lọc bàn theo yêu cầu (trống, đã đặt, đang hoạt động)
  const [tableMap, seTableMap] = useState([]);

  // tìm restaurantsId để lấy dữ liệu bàn của nhà hàng
  useEffect(() => {
    let restaurantsId = 0;
    for (let index = 0; index < restaurants.length; index++) {
      const element = restaurants[index];
      if (element.name == searchParams.get(param.restaurants)) {
        restaurantsId = element.id;
      }
    }

    let tables = [];
    let maxTable = 10;
    if (restaurantsId == 2) {
      maxTable = 20;
    }
    if (restaurantsId == 3) {
      maxTable = 30;
    }
    if (restaurantsId == 4) {
      maxTable = 40;
    }

    for (let index = 1; index <= maxTable; index++) {
      const item = createTable({
        tableId: index,
        image: "/table/CN_6.png",
        status: randomInt(3, 1),
        floor: '1',
        tablenumber: `Bàn số ${index}`,
        numberSeat: "6",
        shape: "Vuông"
      });
      item["selected"] = false;
      tables.push(item);
    }

    // Lấy toàn bộ table của nhà hàng, tiến hành hiển thị danh sách lọc
    seTableMap(tables);
  }, [restaurants]);

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

    // Cập nhật chọn bàn
    let newParam = searchParams.get(param.selectTable);
    if (newParam == null) {
      searchParams.set(param.selectTable, `${table.tableId}`);
      setSearchParams(searchParams);
      return;
    }

    const listTableId = newParam.split(",").map(Number);
    let filter = listTableId.filter((item) => item !== table.tableId);
    if (listTableId.length === filter.length) {
      filter.push(table.tableId);
    }

    filter.sort((a, b) => a - b);
    searchParams.set(param.selectTable, `${filter.toString()}`);

    table.selected = !table.selected;
    setSearchParams(searchParams);
    console.log("handleChooseTable", newParam, listTableId, filter);
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
    // console.log("filterStatusTable", newList);
  }

  console.log("Table");

  return (

    <div className="my-layout">
      {contextHolder}
      <div className="my-layout container h-100 px-0">
        {headerPage({ filterStatusTable })}

        {/* Body của trang table */}
        <div className="my-content h-100">
          <div className="row pt-2 mx-0 h-100">
            {/* Phần trái */}
            <div className="col h-100">
              <div className="my-layout">
                <div className="my-content">
                  <div className="row row-cols-4 mx-0">
                    {filterTableStatusList.map((item, index) => {
                      return (
                        <div key={index} className="col pb-4">
                          <button
                            type="button"
                            className={`${styleDefault} ${colorStatus[item.status]} ${borderSelect[item.selected]}`}
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
              </div>
            </div>
            {/* Phần phải */}
            <div className="col-4 border-start h-100">
              <Reservation />
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

const headerPage = ({ filterStatusTable, refreshTableList }) => {
  {/* Header của trang table */ }
  return < div className="mt-2 row mx-0 px-4 my-header" >
    <div className="col my-center-vertiacal height-60">
      <h2>Xin mời chọn bàn</h2>
    </div>

    <div className="col my-center-vertiacal gap-4 justify-content-end">
      <button
        type="button"
        className="grey h-100 w-25 d-flex align-items-center justify-content-center border-0"
        onClick={() => { }}
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
  </div >

}

export default Table;
