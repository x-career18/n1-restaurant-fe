import React, { useContext, useEffect, useState } from "react";
import AppContext from "../contexts/AppContext/AppContext";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import Reservation from "./Reservation";

const Table = () => {
  const navigate = useNavigate();
  const { tableList, selectList, setSelectList } = useContext(AppContext);
  const [mode, contextHolder] = notification.useNotification(); // success info warning error

  const handleNext = () => {
    if (selectList.length === 0) {
      openNotificationWithIcon("error", "Bạn phải chọn ít nhất 1 bàn.!");
      return;
    }
    navigate("/reservation");
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
    // Thêm/xóa bàn vào danh sách đang chọn
    const filterList = selectList.filter((item) => item !== table.tableId);
    let newListSelect = [];
    if (filterList.length === selectList.length) {
      newListSelect = [...selectList, table.tableId];
    } else {
      newListSelect = filterList;
    }
    setSelectList(newListSelect);
  };

  const openNotificationWithIcon = (type, message) => {
    mode[type]({
      message: "Thông báo",
      description: message,
    });
  };

  return (
    <div>
      {contextHolder}
      {/* Header của trang table */}
      <div className="mt-2 row mx-0 px-4 height-60" >
        <div className="col my-center-vertiacal">
          <h2>Xin mời chọn bàn</h2>
        </div>

        <div className="col my-center-vertiacal gap-4 justify-content-end">
          <div className="color-free h-100 w-25 d-flex align-items-center justify-content-center">
            Còn trống
          </div>
          <div className="color-reservation h-100 w-25 d-flex align-items-center justify-content-center">
            Đã đặt
          </div>
          <div className="color-active h-100 w-25 d-flex align-items-center justify-content-center">
            Đang hoạt động
          </div>
        </div>
      </div>

      {/* Body của trang table */}
      <div className="row mt-2 mx-0">
        {/* Phần trái */}
        <div className="col">
          <div className="row row-cols-4 mx-0">
            {tableList.map((item, index) => {
              const styleDefault =
                "ratio ratio-1x1 d-flex flex-column align-items-center justify-content-center fs-4";
              const styleStatus =
                item.status === 1
                  ? "color-free"
                  : item.status === 2
                    ? "color-reservation"
                    : "color-active";
              const stylesSelect = selectList.includes(item.tableId)
                ? `border-2`
                : `border-0`;
              return (
                <div key={index} className="col pb-4">
                  <button
                    type="button"
                    className={`${styleDefault} ${styleStatus} ${stylesSelect}`}
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
  );
};

export default Table;
