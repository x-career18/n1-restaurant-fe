import axiosInstance from "./axiosInstance";

const baseTable = "/table";

const tableAPI = {
    create: (values) => axiosInstance.post(baseTable + "/create", values),
    getById: (values) => axiosInstance.get(baseTable + "/getById?tableId=" + values),
    getByRestaurantId: (values) => axiosInstance.get(baseTable + "/getByRestaurantId?restaurantId=" + values),
    getAll: () => axiosInstance.get(baseTable),
};

export default tableAPI;