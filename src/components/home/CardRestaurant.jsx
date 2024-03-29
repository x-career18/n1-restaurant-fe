import React from 'react'
import { useNavigate } from 'react-router-dom';
import { param } from '../../contexts/QueryParam';

const colorBg = [
    "#e8453e",
    "#fb3a33",
    '#f8b51c',
    "#f47524"
]

const CardRestaurant = ({ index, item, onClickOrder, onClickMenu }) => {
    const navigate = useNavigate();

    return (
        <div key={index} className='col'
            style={{
                color: 'white',
                backgroundColor: colorBg[index]
            }}
        >
            <div className='p-3'
                style={{
                    fontSize: 40
                }}
            >
                {item.name}
            </div>
            <div
                style={{
                    fontSize: 20
                }}
            >
                {item.description}
            </div>
            <div
                style={{
                    marginTop: 10,
                    textAlign: 'left',
                    fontSize: 20
                }}
            >
                {`Số lượt đặt bàn trong tuần:  ${item["reportOrderCount"] ?? "Chưa có thông tin"}`}
            </div>
            <div
                className='p-4 row gap-4 '
            >
                <button className='col text-my-color-navbar'
                    style={{
                        border: "1px solid black",
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 46,
                        width: 211,
                        fontSize: 16
                    }}
                    onClick={() => {
                        navigate(`/table?${param.restaurants}=${item.name}`);
                    }}
                >
                    Đặt bàn
                </button>
                <button className='col text-my-color-navbar'
                    style={{
                        border: "1px solid black",
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 46,
                        width: 211,
                        fontSize: 14
                    }}
                    onClick={() => {
                        navigate("/combo-menu")
                    }}
                >
                    Xem thực đơn
                </button>
            </div>
        </div>
    )
}

export default CardRestaurant;