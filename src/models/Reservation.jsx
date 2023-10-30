// Thể hiện thông tin đặt bàn từ khách hàng

import Order from "../pages/Order";

export const Reservation = {
    fullName: "",
    phoneNo: "",
    restaurantId: "",
    tableId: "",
    tableCount: "",
    order: Order,
    checkinTime: "",
    expiredTime: "",
    status: "",
};

const createReservation = ({
    _id,
    fullname,
    phoneNo,
    restaurantId,
    tableId,
    tableCount,
    order,
    checkinTime,
    expiredTime,
    status,
}) => {
    return {
        _id,
        fullname,
        phoneNo,
        restaurantId,
        tableId,
        tableCount,
        order,
        checkinTime,
        expiredTime,
        status,
    }
}

export default createReservation;