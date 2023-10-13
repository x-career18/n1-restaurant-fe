import React, { useContext } from 'react'
import FoodOrderItem from '../../modelUI/FoodOrderItem';
import AppContext from '../../contexts/AppContext/AppContext';

const FoodOrder = () => {
    const { foodOrder, setFoodOrder } = useContext(AppContext);
    
    return (
        <div className="h-100 overflow-auto position-relative">
            <h1>Danh sách đặt món ăn</h1>
            <hr />
            {/* Danh sách hiển thị các món đã chọn */}
            {
                foodOrder.length !== 0 ? foodOrder.map((item, index) => {
                    return <FoodOrderItem item={item}/>
                }) : "Xin mời chọn món"
            }
            <div className="text-center position-fixed bottom-0 end-0 p-4">
                <button
                    className="btn btn-primary"
                >
                    Đặt món
                </button>
            </div>
        </div>
    )
}

export default FoodOrder;
