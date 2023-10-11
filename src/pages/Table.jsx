import React, { useContext, useEffect, useState } from "react";
import Main from "../components/Main";
import AppContext from "../contexts/AppContext/AppContext";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

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
    <Main>
      {contextHolder}
      <div className="h-100">
        <div
          className="mt-2 row align-items-center"
          style={{
            height: 60,
          }}
        >
          <h2 className="col px-4">Xin mời chọn bàn</h2>
          <div className="col h-100 align-items-center">
            <div className="d-flex h-75 gap-4">
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
        </div>
        <div className="row row-cols-4">
          {tableList.map((item, index) => {
            const styleDefault =
              "ratio ratio-1x1 d-flex flex-column align-items-center justify-content-center p-3 fs-4";
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
              <div key={index} className="col p-4 ">
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
      <div className="position-fixed bottom-0 end-0 z-1 p-4">
        <button
          type="button"
          className="bg-my-primary text-center text-white fs-3 p-2 rounded-1 border-0"
          onClick={handleNext}
        >
          Tiếp theo
        </button>
      </div>
    </Main>
  );
};

export default Table;
