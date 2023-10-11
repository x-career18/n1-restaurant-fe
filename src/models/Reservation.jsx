// Thể hiện thông tin đặt bàn từ khách hàng

import Order from "./Order";

export const Reservation = {
    restaurantId: "",
    tableId: "",
    fullName: "",
    phoneNo: "",
    order: Order,
    tableCount: "",
    checkinTime: "",
    expiredTime: "",
    status: "",
};

export default Reservation;