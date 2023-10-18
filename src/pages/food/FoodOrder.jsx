import React, { useContext } from "react";
import FoodOrderItem from "../../modelUI/FoodOrderItem";
import AppContext from "../../contexts/AppContext/AppContext";

const FoodOrder = ({ isModal = false }) => {
  const { foodOrder, setFoodOrder } = useContext(AppContext);

  let totalPrice = 0;
  for (let index = 0; index < foodOrder.length; index++) {
    totalPrice += foodOrder[index].price;
  }

  return (
    <div className="my-layout">
      <div className="my-header">
        <h1>Danh sách đặt món ăn</h1>
        <hr />
      </div>
      <div className="my-content">
        {foodOrder.length !== 0
          ? foodOrder.map((item, index) => {
              return <FoodOrderItem item={item} index={index}/>;
            })
          : "Xin mời chọn món"}
      </div>
      <div className="my-footer">
        <div className="row mt-2">
          <div className="col-7 text-start">
            <h5>Tổng thanh toán</h5>
          </div>
          <div className="col text-end">
            <h5>${totalPrice}</h5>
          </div>
        </div>
        {!isModal && (
          <div className="text-end pe-2">
            <button className="btn btn-primary">Đặt món</button>
          </div>
        )}
      </div>
    </div>

    // <div className="h-100 overflow-auto position-relative">
    //     <h1>Danh sách đặt món ăn</h1>
    //     <hr />
    //     {/* Danh sách hiển thị các món đã chọn */}
    //     {
    //         foodOrder.length !== 0 ? foodOrder.map((item, index) => {
    //             return <FoodOrderItem item={item} />
    //         }) : "Xin mời chọn món"
    //     }
    // {
    //     !isModal && <div className="text-center position-fixed bottom-0 end-0 p-4">
    //         <button
    //             className="btn btn-primary"
    //         >
    //             Đặt món
    //         </button>
    //     </div>
    // }
    // </div>
  );
};

export default FoodOrder;
