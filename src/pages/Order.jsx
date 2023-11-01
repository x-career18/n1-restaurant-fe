import React, { useContext, useEffect, useState } from 'react'
import { notification } from "antd";
import MenuModal from '../modals/MenuModal';
import AuthContext from '../contexts/AuthContext/AuthContext';
import reservationAPI from '../apis/reservationAPI';
import createReservation from '../models/Reservation';
import { pasreStringtoData } from '../utils/DateUtil';
import AppContext from '../contexts/AppContext/AppContext';

const Order = () => {
    const [mode, contextHolder] = notification.useNotification(); // success info warning error
    const { auth } = useContext(AuthContext);
    const { foodOrder, setFoodOrder } = useContext(AppContext);
    const [modalShow, setModalShow] = useState(false);
    const [selectTable, setSelectTable] = useState(null);
    const [tableActiveList, settableActiveList] = useState([]);

    useEffect(() => {
        getAllReservationByRestaurantID();
    }, []);

    const getAllReservationByRestaurantID = async () => {
        try {
            const response = await reservationAPI.getAllByRestaurantId(auth.user.restaurantId, 3);
            if (response.data.success) {
                const tableList = response.data.data;
                let tables = [];
                for (let index = 0; index < tableList.length; index++) {
                    const item = createReservation(tableList[index]);
                    tables.push(item);
                }
                settableActiveList(tables);
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    const openNotificationWithIcon = (type, message) => {
        mode[type]({
            message: "Thông báo",
            description: message,
        });
    };

    const handleChooseTable = (table) => {
        // Kiểm tra trạng thái bàn
        if (table.status !== 3) {
            openNotificationWithIcon(
                "warning",
                "Bạn chỉ được phép chọn bàn đang mở.!"
            );
            return;
        }
        setFoodOrder(table.order);
        setSelectTable(table.tableId.toString());
        setModalShow(true);
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
                    {tableActiveList.map((item, index) => {
                        const styleDefault =
                            "p-3 fs-4 border-0";
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
                                    <h3>
                                        Bàn số: {item.tableId.toString()}
                                    </h3>
                                    <div className='row mx-0 justify-content-start'>
                                        Tên: {item.fullname}
                                    </div>
                                    <div className='row mx-0 justify-content-start'>
                                        SĐT: {item.phoneNo}
                                    </div>
                                    <div className='row mx-0 justify-content-start'>
                                        CheckIn: {pasreStringtoData(item.updatedAt)}
                                    </div>
                                </button>
                            </div>
                        );

                    })}
                </div>
            </div>
            <MenuModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                tableName={"Bàn số " + selectTable}
            />
        </>
    );
};

export default Order