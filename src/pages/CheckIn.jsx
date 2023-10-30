import React, { useContext, useEffect, useState } from 'react'
import { notification } from "antd";
import AuthContext from '../contexts/AuthContext/AuthContext';
import reservationAPI from '../apis/reservationAPI';
import createReservation from '../models/Reservation';
import { pasreStringtoData } from '../utils/DateUtil';
import ReservationDetailModal from '../modals/ReservationDetailModal';
import tableAPI from '../apis/tableAPI';

const CheckIn = () => {
    const [mode, contextHolder] = notification.useNotification(); // success info warning error
    const { auth } = useContext(AuthContext);
    const [modalShow, setModalShow] = useState(false);
    const [selectReservation, setSelectReservation] = useState(null);
    const [tableActiveList, settableActiveList] = useState([]);

    useEffect(() => {
        getAllReservationByRestaurantID();
    }, []);

    const getAllReservationByRestaurantID = async () => {
        try {
            const response = await reservationAPI.getAllByRestaurantId(auth.user.restaurantId, 0);
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

    const handleChooseTable = (reservation) => {
        // Kiểm tra trạng thái bàn
        if (reservation.status !== 0) {
            openNotificationWithIcon(
                "warning",
                "Bạn chỉ được phép chọn bàn đã đặt.!"
            );
            return;
        }
        setSelectReservation(reservation);
        setModalShow(true);
    };

    const handleOpenTable = async (tableId) => {
        await tableAPI.openTable({ tableId });
        await reservationAPI.checkInReservation(selectReservation._id);
        openNotificationWithIcon(
            "info",
            `Bàn (${tableId.toString()}) đã mở.!`
        );
        getAllReservationByRestaurantID();
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
                    <h2 className="col px-4">Chọn bàn để check in</h2>
                </div>
                <div className="row row-cols-3 row-cols-lg-4">
                    {tableActiveList?.map((item, index) => {
                        const styleDefault =
                            "p-3 fs-4 border-0";
                        const styleStatus =
                            item.status === 1
                                ? "color-free"
                                : item.status === 0
                                    ? "color-reservation"
                                    : "color-active";
                        return (
                            <div key={index} className="col p-4 align-items-start">
                                <button
                                    type="button"
                                    className={`${styleDefault} ${styleStatus}`}
                                    onClick={() => handleChooseTable(item)}
                                >
                                    <h3>
                                        Bàn đặt: {item.tableId.toString()}
                                    </h3>
                                    <div className='row mx-0 justify-content-start'>
                                        Tên: {item.fullname}
                                    </div>
                                    <div className='row mx-0 justify-content-start'>
                                        SĐT: {item.phoneNo}
                                    </div>
                                    <div className='row mx-0 justify-content-start'>
                                        Đặt: {pasreStringtoData(item.checkinTime)}
                                    </div>
                                    <div className='row mx-0 justify-content-start'>
                                        Hủy: {pasreStringtoData(item.expiredTime)}
                                    </div>
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
            <ReservationDetailModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                reservation={selectReservation}
                openTable={handleOpenTable}
            />
        </>
    );
};

export default CheckIn