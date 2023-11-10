import axiosInstance from "./axiosInstance";

const baseTable = "/table";

const tableAPI = {
    create: (values) => axiosInstance.post(baseTable + "/create", values),
    update: (values) => axiosInstance.post(baseTable + "/update", values),
    getById: (values) => axiosInstance.get(baseTable + "/getById?tableId=" + values),
    getByRestaurantId: (values) => axiosInstance.get(baseTable + "/getByRestaurantId?restaurantId=" + values),
    getAllByRestaurantIdAndStatus: (values, status) => axiosInstance.get(baseTable + "/getByRestaurantId?restaurantId=" + values + "&status=" + status),
    openTable: (values) => axiosInstance.post(baseTable + "/openTable", values),
    closeTable: (values) => axiosInstance.post(baseTable + "/closeTable", values),
    getAll: () => axiosInstance.get(baseTable),
};

export default tableAPI;