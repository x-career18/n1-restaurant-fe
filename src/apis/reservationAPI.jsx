import axiosInstance from "./axiosInstance";

const baseReservation = "/reservation";

const reservationAPI = {
    create: (values) => axiosInstance.post(baseReservation + "/create", values),
    getById: (values) => axiosInstance.get(baseReservation + "/getById?reservationId=" + values),
    getAll: () => axiosInstance.get(baseReservation),
};

export default reservationAPI;