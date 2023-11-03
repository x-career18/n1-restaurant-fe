import React, { useContext, useEffect, useState } from 'react'
import { FOOD } from '../../utils/LoadImage';
import { Button, Dropdown, Space, notification } from 'antd';
import { FaBowlFood, FaAngleDown } from "react-icons/fa6";
import FoodOrder from './FoodOrder';
import AppContext from '../../contexts/AppContext/AppContext';
import { category } from '../../models/CategoryFood';

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

const Food = ({ showDesc = true, isModal = false }) => {
    const { foodOrder, setFoodOrder, menu } = useContext(AppContext);
    const [categoryActive, setCategoryActive] = useState("All");
    const [pageNo, setPageNo] = useState(1);
    const [countPageTotal, setCountPageTotal] = useState(0);
    const [showMenu, setShowMenu] = useState([]);
    const [mode, contextHolder] = notification.useNotification();

    // Load lần đầu
    useEffect(() => {
        handleShowMenu(1);
    }, [menu]);

    // Cập nhật menu khi chọn category
    useEffect(() => {
        handleShowMenu(1);
    }, [categoryActive]);

    // Cập nhật menu khi chọn page
    useEffect(() => {
        handleShowMenu(pageNo);
    }, [pageNo]);

    // Phân trang: 1 trang có 12 món. Dữ liệu giả
    const handleSelectPage = (pageNo) => {
        setPageNo(pageNo);
    }

    const handleShowMenu = (pageNo) => {
        if (menu?.length == 0) return;
        let newMenu = [];
        const filterList = categoryActive != "All" ? menu.filter((e) => e.category == categoryActive) : menu;
        const startIndex = 12 * (pageNo - 1);
        for (let index = 0; index < 12; index++) {
            newMenu.push(filterList[index + startIndex]);
        }
        const count = Math.ceil(filterList.length / 12);
        setCountPageTotal(count);
        setShowMenu(newMenu);
        // console.log("handleShowMenu", categoryActive, pageNo, newMenu);
    }

    const handleMenuClick = (e) => {
        const categoryChoose = category[e.key];
        setCategoryActive(categoryChoose);
        // console.log("handleMenuClick", categoryChoose);
    };

    const handleOnClickFoodItem = (item) => {
        if (foodOrder.find((e) => e.item == item.foodName)) {
            openNotificationWithIcon(
                "warning",
                `Món ăn đã có trong thực đơn.!`
            );
            return;
        }
        item["count"] = 1;
        setFoodOrder([...foodOrder, {
            "item": item.foodName,
            "quantity": item.count,
            "discount": item.discount,
            "costPerUnit": item.price
        }]);
    }

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
    const openNotificationWithIcon = (type, message) => {
        mode[type]({
            message: "Thông báo",
            description: message,
        });
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    // console.log("Food showMenu", showMenu);
    // console.log("Food countPageTotal", countPageTotal);

    return (
        <div className="row mx-0 h-100">
            {contextHolder}
            {/* Phần trái */}
            <div className="col h-100 position-relative px-0">
                <div className='position-absolute top-0 start-0 p-4'>
                    {CategoryFood(menuProps, categoryActive)}
                </div>
                <div className='my-layout'>
                    <div className="my-content">
                        <div className="row row-cols-3 row-cols-lg-4 mx-0">
                            {
                                showMenu.map((item, index) => {
                                    return FoodItem(index, item, handleOnClickFoodItem)
                                })
                            }
                        </div>
                    </div>
                    <div className="my-footer d-flex justify-content-center">
                        {Pagination(countPageTotal, handleSelectPage, pageNo)}
                    </div>
                </div>
            </div>
            {/* Phần phải */}
            <div className="col-4 border-start h-100">
                <FoodOrder isModal={isModal} />
            </div>
        </div>
    )
}

const Pagination = (totalPage, handleSelectPage, pageNo) => {
    return <div className='d-flex align-items-end'
        style={{
            height: 60
        }}>
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className={`page-item ${pageNo <= 1 ? "disabled" : ""}`}>
                    <div className="page-link" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </div>
                </li>
                {[...Array(totalPage)].map((_, index) => {
                    return <li
                        key={index}
                        className="page-item" onClick={() => {
                            handleSelectPage(index + 1);
                        }}>
                        <div className="page-link">{index + 1}</div>
                    </li>;
                })}
                <li className={`page-item ${pageNo >= totalPage ? "disabled" : ""}`}>
                    <div className="page-link" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </div>
                </li>
            </ul>
        </nav>
    </div>;
}

const CategoryFood = (menuProps, categoryActive) => {
    return <Dropdown
        overlayStyle={{
            zIndex: 1100
        }}
        menu={menuProps} trigger={['click']}
    >
        <Button size={"large"}>
            <Space>
                {categoryActive}
                <FaAngleDown />
            </Space>
        </Button>
    </Dropdown>
}

const FoodItem = (index, item, onClick) => {
    if (!item) return;
    return <div key={index} className="col p-3">
        <img src={item.img} alt={item.img} className="img-fluid" />
        <div className="d-flex flex-column align-items-center ">
            <h5 className="fs-5 fw-bold text-uppercase">
                {item.foodName}
            </h5>
            <span className="fs-5 fw-bold">
                ${item.price}
            </span>
            <button type="button" className="bg-my-primary text-center text-white fs-5 p-2 rounded-1 border-0"
                onClick={() => onClick(item)}>
                Add Cart
            </button>
        </div>
    </div>;
}

export default Food