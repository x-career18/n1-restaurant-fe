import React, { useContext, useState } from "react";
import FoodOrderItem from "../../modelUI/FoodOrderItem";
import AppContext from "../../contexts/AppContext/AppContext";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "../../utils/NumberWithCommas";

const FoodOrder = ({ isModal = false }) => {
  const { foodOrder, setFoodOrder } = useContext(AppContext);
  const [isChange, setIsChange] = useState(false);
  const navigate = useNavigate();

  const handeCount = (index, item) => {
    foodOrder[index] = item;
    setIsChange(!isChange);
  }

  const handeRemove = (index) => {
    foodOrder.splice(index, 1);
    if (foodOrder.length == 0) {
      setFoodOrder([]);
    }
    setIsChange(!isChange);
  }

  const handleOrder = () => {
    navigate("/table");
  };

  let totalPrice = 0;
  for (let index = 0; index < foodOrder.length; index++) {
    totalPrice += foodOrder[index].costPerUnit * foodOrder[index].quantity;
  }

  console.log(foodOrder)

  return (
    <div className="my-layout">
      <div className="my-header">
        <h3>Danh sách đặt món ăn</h3>
        <hr />
      </div>
      <div className="my-content">
        {foodOrder.length !== 0
          ? foodOrder.map((item, index) => {
            return <FoodOrderItem item={item} index={index} handeCount={handeCount} handeRemove={handeRemove} />;
          })
          : "Xin mời chọn món"}
      </div>
      <div className="my-footer">
        <div className="row mt-2">
          <div className="col-7 text-start">
            <h5>Tổng thanh toán</h5>
          </div>
          <div className="col text-end">
            <h5>${numberWithCommas(totalPrice)}</h5>
          </div>
        </div>
        {!isModal && (
          <div className="text-end pe-2 py-2">
            <button className="btn btn-primary" onClick={handleOrder}>Đặt món</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodOrder;
