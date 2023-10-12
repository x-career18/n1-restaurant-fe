import React, { useEffect } from 'react'
import Main from '../components/Main'
import { FOOD } from '../utils/LoadImage';
import Reservation from './Reservation';

const dataTemple = {
    id: 1,
    title: "Sicilian",
    desc: "Ignite your taste buds with a fiery combination of spicy pepperoni, jalapeños, crushed red pepper flakes, and melted mozzarella cheese, delivering a kick with every bite.",
    img: FOOD[0],
    price: 24.9,
    options: [
        {
            title: "Small",
            additionalPrice: 0,
        },
        {
            title: "Medium",
            additionalPrice: 4,
        },
        {
            title: "Large",
            additionalPrice: 6,
        },
    ],
}


const Food = ({ showDesc = true }) => {
    let foodList = [];
    for (let index = 0; index < 50; index++) {
        foodList.push(dataTemple);
    }
    return (
        <div className="row pt-2 mx-0 h-100">
            {/* Phần trái */}
            <div className="col h-100">
                <div className="row row-cols-3 row-cols-md-4 text-my-color-navbar mx-0 h-100 overflow-auto">
                    {foodList.map((item, index) => (
                        <div key={index} className="col p-4">
                            {item.img && (
                                <img src={item.img} alt={item.img} className="img-fluid" />
                            )}
                            <div className="d-flex flex-column align-items-center ">
                                <h1 className="fs-3 fw-bold text-uppercase">
                                    {item.title}
                                </h1>
                                {
                                    showDesc && <p className="p-2">
                                        {item.desc}
                                    </p>
                                }
                                <span className="fs-3 fw-bold">
                                    ${item.price}
                                </span>
                                <button type="button" className="bg-my-primary text-center text-white fs-4 p-2 rounded-1 border-0"
                                    onClick={() => {

                                    }}>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Phần phải */}
            <div className="col-4 border-start h-100">
                <Reservation />
            </div>
        </div>
    )
}

export default Food