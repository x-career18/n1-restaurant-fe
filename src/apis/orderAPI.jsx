import axiosInstance from "./axiosInstance";

const baseTable = "/order";

const orderAPI = {
    create: (values) => axiosInstance.post(baseTable + "/create", values),
    update: (values) => axiosInstance.post(baseTable + "/update", values),
    getById: (values) => axiosInstance.get(baseTable + "/getById?reservationId=" + values),
    getAll: () => axiosInstance.get(baseTable),
};

export default orderAPI;