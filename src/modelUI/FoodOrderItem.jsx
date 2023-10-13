import React from 'react'
import { FaRegTrashCan } from "react-icons/fa6";
import { InputNumber } from 'antd';


const FoodOrderItem = ({ item }) => {

  const onChange = (value) => {
    console.log('changed', value);
  };

  return (
    <div className='row mx-0'>
      {/* Hình ảnh món ăn */}
      <div className='col'>
        {item.img && (
          <img src={item.img} alt={item.img} className="img-fluid" />
        )}
      </div>
      {/* Tên món ăn */}
      <div className='col fs-4 fw-bold'>
        {item.foodName}
      </div>
      {/* Số lượng đặt */}
      <div className='col'>
        <InputNumber 
        size="large" 
        controls={true}
        min={1} 
        max={10} 
        defaultValue={3} 
        onChange={onChange} />
      </div>
      {/* Nút xóa */}
      <div className='col'>
        <FaRegTrashCan className="text-danger" />
      </div>
      <hr />
    </div>
  )
}

export default FoodOrderItem