import axiosInstance from "./axiosInstance";

const baseTable = "/payment";

const paymentAPI = {
    create: (values) => axiosInstance.post(baseTable + "/create", values),
    update: (values) => axiosInstance.post(baseTable + "/update", values),
    getById: (values) => axiosInstance.get(baseTable + "/getById?paymentId=" + values),
    getAll: () => axiosInstance.get(baseTable),
};

export default paymentAPI;