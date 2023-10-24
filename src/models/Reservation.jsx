// Thể hiện thông tin đặt bàn từ khách hàng

import Order from "./Order";

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

export default Reservation;