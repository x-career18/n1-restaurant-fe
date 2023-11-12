import { notification } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../contexts/AuthContext/AuthContext';
import AppContext from '../contexts/AppContext/AppContext';
import reservationAPI from '../apis/reservationAPI';
import createReservation from '../models/Reservation';
import orderAPI from '../apis/orderAPI';
import { pasreStringtoData } from '../utils/DateUtil';
import PaymentModal from '../modals/PaymentModal';
import paymentAPI from '../apis/paymentAPI';
import { isObjectEmpty } from '../utils/CheckEmpty';

const Payment = () => {
    const [mode, contextHolder] = notification.useNotification(); // success info warning error
    const { auth } = useContext(AuthContext);
    const { foodOrder, setFoodOrder } = useContext(AppContext);
    const [modalShow, setModalShow] = useState(false);
    const [selectTable, setSelectTable] = useState(null);
    const [orderId, setOrderId] = useState(null);
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

    const updateReservationById = async (model) => {
        try {
            const response = await reservationAPI.update(model);
            if (response.data.success) {
                return true;
            }
            return false;
        } catch (error) {
            console.log("error", error);
            return false;
        }
    }

    const openNotificationWithIcon = (type, message) => {
        mode[type]({
            message: "Thông báo",
            description: message,
        });
    };

    const handleChooseTable = async (table) => {
        // Kiểm tra trạng thái bàn
        if (table.status !== 3) {
            openNotificationWithIcon(
                "warning",
                "Bạn chỉ được phép chọn bàn đang mở.!"
            );
            return;
        }

        const orderRes = await getOrderByReservation(table._id);
        if (orderRes) {
            setFoodOrder(orderRes.order);
            setOrderId(orderRes._id);
        } else {
            setFoodOrder(table.order);
        }

        setSelectTable(table);
        setModalShow(true);
    };

    const handlePayment = async (info, payment) => {
        try {
            // Cập nhật thông tin khách hàng
            let updateInfoReservation = {}
            if (info.fullname != "") {
                updateInfoReservation["fullname"] = info.fullname;
            }

            if (info.phoneNo != "") {
                updateInfoReservation["phoneNo"] = info.phoneNo;
            }

            if (!isObjectEmpty(updateInfoReservation)) {
                const response = await updateReservationById(updateInfoReservation);
                if (!response) {
                    openNotificationWithIcon(
                        "error",
                        "Cập nhật thông tin không thành công.!"
                    );
                    return;
                }
            }

            const response = await paymentAPI.create({
                orderId: orderId,
                userId: auth.user._id,
                payment: payment
            });

            if (response.data.success) {
                openNotificationWithIcon(
                    "info",
                    "Thanh toán thành công.!"
                );
                getAllReservationByRestaurantID();
            } else {
                openNotificationWithIcon(
                    "info",
                    "Thanh toán thất bại.!"
                );
            }
        } catch (error) {
            console.log("error", error);
            openNotificationWithIcon(
                "info",
                "Hệ thống hiện không hoạt động.!"
            );
        }
    };

    const getOrderByReservation = async (reservationId) => {
        try {
            const response = await orderAPI.getById(reservationId);
            if (response.data.success) {
                const orderList = response.data.data;
                return orderList;
            }
        } catch (error) {
            console.log("error", error);
        }
        return null;
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
                    <h2 className="col px-4">Mời chọn bàn để thanh toán</h2>
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
                                        CheckIn: {pasreStringtoData(item.checkinTime)}
                                    </div>
                                </button>
                            </div>
                        );

                    })}
                </div>
            </div>
            <PaymentModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                table={selectTable}
                payment={(payment) => handlePayment(payment)}
                isCanel={() => { }}

            />
        </>
    );
}

export default Payment;