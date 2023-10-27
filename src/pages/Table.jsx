import React, { useContext, useEffect, useState } from "react";
import AppContext from "../contexts/AppContext/AppContext";
import { notification } from "antd";
import Reservation from "./Reservation";
import createTable from "../models/Table";
import { randomInt } from "../utils/Random";
import { useNavigate, useSearchParams } from "react-router-dom";
import { param } from "../contexts/QueryParam";
import { getIdByRestaurantName } from "../utils/TableUtil";
import TableContext from "../contexts/TableContext/TableContext";

const colorStatus = {
  "1": "color-free",
  "0": "color-reservation",
  "2": "color-active",
};

const styleDefault = "ratio ratio-1x1 d-flex flex-column align-items-center justify-content-center fs-4";

const borderSelect = {
  true: "border-2",
  false: "border-0"
}

// Hiển thị sơ đồ bàn của nhà hàng được chọn
const Table = () => {
  const { restaurants } = useContext(AppContext);
  const { getAllTableByRestaurant, tableMap, seTableMap } = useContext(TableContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [mode, contextHolder] = notification.useNotification(); // success info warning error
  const [filterTableStatusList, setfilterTableStatusList] = useState([]); // Lọc bàn theo yêu cầu (trống, đã đặt, đang hoạt động)
  const [modeFilter, setModeFilter] = useState("All"); // Lọc bàn theo yêu cầu (trống, đã đặt, đang hoạt động)

  const navigate = useNavigate();

  const newParam = searchParams.get(param.selectTable)?.split(",");

  // tìm restaurantsId để lấy dữ liệu bàn của nhà hàng
  useEffect(() => {
    const restaurantsId = getIdByRestaurantName(restaurants, searchParams.get(param.restaurants));
    if (!restaurantsId) {
      navigate("/");
      return;
    }

    // Lấy toàn bộ table của nhà hàng, tiến hành hiển thị danh sách lọc
    getAllTableByRestaurantID(restaurantsId);

  }, [restaurants]);

  const getAllTableByRestaurantID = async (restaurantsId) => {
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
    if (newParam == null || newParam == "") {
      searchParams.set(param.selectTable, `${table.tableName}`);
      setSearchParams(searchParams);
      return;
    }

    let filter = newParam.filter((item) => item !== table.tableName);
    if (newParam.length === filter.length) {
      filter.push(table.tableName);
    }

    filter.sort((a, b) => a - b);
    searchParams.set(param.selectTable, `${filter.toString()}`);
    setSearchParams(searchParams);
    // console.log("handleChooseTable", newParam, listTableId, filter);
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
      newList = tableMap.filter((e) => e.status === 0);
    } else if (status === "active") {
      newList = tableMap.filter((e) => e.status === 3);
    } else {
      newList = tableMap;
    }

    setModeFilter(status)
    setfilterTableStatusList(newList);
    // console.log("filterStatusTable", newList);
  }

  const refreshTableList = () => {
    const restaurantsId = getIdByRestaurantName(restaurants, searchParams.get(param.restaurants));
    searchParams.delete(param.selectTable);
    setSearchParams(searchParams);
    getAllTableByRestaurantID(restaurantsId);
  };

  return (

    <div className="my-layout">
      {contextHolder}
      <div className="my-layout container h-100 px-0">
        {headerPage({ filterStatusTable, refreshTableList })}

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
                            className={`${styleDefault} ${colorStatus[item.status]} ${borderSelect[newParam == null ? false : newParam == "" ? false : newParam.includes(item.tableName)]}`}
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
        onClick={() => { refreshTableList() }}
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
