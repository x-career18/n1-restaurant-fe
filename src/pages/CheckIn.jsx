import React, { useContext, useEffect, useState } from 'react'
import { notification } from "antd";
import AppContext from '../contexts/AppContext/AppContext';
import { useNavigate } from 'react-router-dom';
import MenuModal from '../modals/MenuModal';
import AuthContext from '../contexts/AuthContext/AuthContext';
import createTable from '../models/Table';
import TableContext from '../contexts/TableContext/TableContext';

const CheckIn = () => {
    const [mode, contextHolder] = notification.useNotification(); // success info warning error
    const { restaurants } = useContext(AppContext);
    const { auth } = useContext(AuthContext);
    const { getAllTableByRestaurant } = useContext(TableContext)
    const [modalShow, setModalShow] = useState(false);
    const [selectTableOrder, setSelectTableOrder] = useState(-1);
    const [tableActiveList, settableActiveList] = useState([]);

    useEffect(() => {
        getAllTableByRestaurantID(auth.user.restaurantId);
    }, [restaurants])

    const openNotificationWithIcon = (type, message) => {
        mode[type]({
            message: "Thông báo",
            description: message,
        });
    };

    const handleChooseTable = (table) => {
        // Kiểm tra trạng thái bàn
        if (table.status !== 0) {
            openNotificationWithIcon(
                "warning",
                "Bạn chỉ được phép chọn bàn đang hoạt động.!"
            );
            return;
        }
        setSelectTableOrder(table.tableId);
        setModalShow(true);
    };

    const getAllTableByRestaurantID = async (restaurantsId) => {
        const tableList = await getAllTableByRestaurant(restaurantsId);
        let tables = [];
        for (let index = 0; index < tableList.length; index++) {
            const item = createTable({
                tableId: tableList[index]._id,
                tableName: tableList[index].name,
                image: "/table/" + tableList[index].images,
                status: tableList[index].status,
                restaurantId: tableList[index].restaurantId,
            });
            tables.push(item);
        }
        const showList = tables.filter((item) => item.status === 0);
        settableActiveList(showList);
    };

    return (
        <>
            {contextHolder}
            <div className="container">
                <div
                    className="mt-2 row align-items-center"
                    style={{
                        height: 60,
                    }}
                >
                    <h2 className="col px-4">Mời chọn bàn để đặt món</h2>
                </div>
                <div className="row row-cols-3 row-cols-lg-4">
                    {tableActiveList?.map((item, index) => {
                        const styleDefault =
                            "ratio ratio-1x1 d-flex flex-column align-items-center justify-content-center p-3 fs-4 border-0";
                        const styleStatus =
                            item.status === 1
                                ? "color-free"
                                : item.status === 0
                                    ? "color-reservation"
                                    : "color-active";
                        return (
                            <div key={index} className="col p-4 ">
                                <button
                                    type="button"
                                    className={`${styleDefault} ${styleStatus}`}
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
            <MenuModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                tableName={"Bàn số " + selectTableOrder}
            />
        </>
    );
};

export default CheckIn