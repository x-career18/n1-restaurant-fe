import React, { useContext, useEffect, useState } from 'react'
import { FOOD } from '../../utils/LoadImage';
import { Button, Dropdown, Space } from 'antd';
import { FaBowlFood, FaAngleDown } from "react-icons/fa6";
import FoodOrder from './FoodOrder';
import AppContext from '../../contexts/AppContext/AppContext';

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

const category = [
    "All",
    'Đồ nướng',
    'Đồ sào',
    'Đồ thui',
    'Đồ uống',
]


const Food = ({ showDesc = true, isModal = false }) => {
    const { foodOrder, setFoodOrder, menu, setMenu } = useContext(AppContext);
    const [categoryActive, setCategoryActive] = useState("All");
    const [pageNo, setPageNo] = useState(1);
    const [showMenu, setShowMenu] = useState(menu);

    const handleSelectPage = (pageNo) => {
        let newMenu = [];
        for (let index = 0; index < pageNo; index++) {
            newMenu.push(menu[index]);
        }
        setShowMenu(newMenu);
    }

    const handleMenuClick = (e) => {
        setCategoryActive(category[e.key]);
        console.log('click', e);
    };

    let items = [];
    category.map((item, index) => {
        items.push({
            label: item,
            key: index,
            icon: <FaBowlFood />,
            danger: false,
            disabled: false,
        });
    });

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    // Phân trang: 1 trang có 12 món
    const countPageTotal = Math.ceil(menu.length / 12);
    let rowCount = []
    for (let index = 0; index < 9; index += 3) {
        let item = [];
        for (let i = 0; i < 4; i++) {
            const element = menu[index + i];
            item.push(element);
        }
        rowCount.push(item);
    }
    console.log(rowCount)
    return (
        <div className="row mx-0 h-100">
            {/* Phần trái */}
            <div className="col h-100 position-relative px-0">
                <div className='position-absolute top-0 start-0 p-4'>
                    <Dropdown
                        menu={menuProps} trigger={['click']}
                    >
                        <Button size={"large"}>
                            <Space>
                                {categoryActive}
                                <FaAngleDown />
                            </Space>
                        </Button>
                    </Dropdown>
                </div>
                <div className='my-layout'>
                    <div className="my-content">
                        {
                            rowCount.map((item, index) => {
                                return (
                                    <div key={index} className="row mx-0">
                                        {
                                            item.map((item1, index1) => {
                                                if (!item1) {
                                                    return (
                                                        <div key={index + index1 + 1} className="col p-3" />
                                                    )
                                                }

                                                return (
                                                    <div key={index + index1 + 1} className="col p-3">
                                                        {item1.img && (
                                                            <img src={item1.img} alt={item1.img} className="img-fluid" />
                                                        )}
                                                        <div className="d-flex flex-column align-items-center ">
                                                            <h1 className="fs-3 fw-bold text-uppercase">
                                                                {item1.foodName}
                                                            </h1>
                                                            <span className="fs-3 fw-bold">
                                                                ${item1.price}
                                                            </span>
                                                            <button type="button" className="bg-my-primary text-center text-white fs-5 p-2 rounded-1 border-0"
                                                                onClick={() => {
                                                                    setFoodOrder([...foodOrder, item1]);
                                                                }}>
                                                                Add Cart
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })

                        }
                    </div>
                    <div className="my-footer d-flex justify-content-center">
                        <div className='d-flex align-items-end'
                            style={{
                                height: 60
                            }}>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className={`page-item ${pageNo == 0 ? "disabled" : ""}`}>
                                        <div className="page-link" aria-label="Previous">
                                            <span aria-hidden="true">&laquo;</span>
                                        </div>
                                    </li>
                                    {
                                        [...Array(countPageTotal)].map((_, index) => {
                                            return <li
                                                key={index + showMenu.length}
                                                className="page-item" onClick={() => {
                                                    handleSelectPage(index + 1);
                                                    setPageNo(index);
                                                }}>
                                                <div className="page-link"  >{index + 1}</div>
                                            </li>
                                        })
                                    }
                                    <li className={`page-item ${pageNo == countPageTotal - 1 ? "disabled" : ""}`}>
                                        <div className="page-link" aria-label="Next">
                                            <span aria-hidden="true">&raquo;</span>
                                        </div>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            {/* Phần phải */}
            <div className="col-4 border-start h-100">
                <FoodOrder isModal={isModal}/>
            </div>
        </div>
    )
}

export default Food