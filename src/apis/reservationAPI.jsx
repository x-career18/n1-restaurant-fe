import axiosInstance from "./axiosInstance";

const reservationAPI = {
    create: (values) => axiosInstance.post("/reservation/create", values),
    getById: () => axiosInstance.get("reservation/getById"),
};

export default reservationAPI;