import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { InputNumber } from "antd";

const FoodOrderItem = ({ item, index }) => {
  const onChange = (value) => {
    console.log("changed", value);
  };

  return (
    <div key={index} className="row mx-0">
      {/* Tên món ăn */}
      <div className="col d-flex align-items-center flex-column">
        <div className="fs-5 fw-bold">{item.foodName}</div>
        <span className="">${item.price}</span>
      </div>
      {/* Số lượng đặt */}
      <div className="col p-0 d-flex justify-content-center align-items-center">
        <InputNumber
          size="large"
          controls={true}
          min={1}
          max={10}
          defaultValue={1}
          onChange={onChange}
        />
      </div>
      {/* Nút xóa */}
      <div className="col d-flex align-items-center">
        <FaRegTrashCan className="text-danger" />
      </div>
      <hr className="mt-3" />
    </div>
  );
};

export default FoodOrderItem;
