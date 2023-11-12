import axiosInstance from "./axiosInstance";

const baseReservation = "/reservation";

const reservationAPI = {
    checkInReservation: (values) => axiosInstance.get(baseReservation + "/checkInReservation?reservationId=" + values),
    create: (values) => axiosInstance.post(baseReservation + "/create", values),
    getAllByRestaurantId: (values, status) => axiosInstance.get(baseReservation + "/getAllByRestaurantId?restaurantId=" + values + "&status=" + status),
    getById: (values) => axiosInstance.get(baseReservation + "/getById?reservationId=" + values),
    getAllByEmailAndPhone: (mail, phone) => axiosInstance.get(baseReservation + "/getById?email=" + mail + "&phone=" + phone),
    getAll: () => axiosInstance.get(baseReservation),
};

export default reservationAPI;