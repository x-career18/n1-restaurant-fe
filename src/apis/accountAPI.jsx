import axiosInstance from "./axiosInstance";

const baseAccount = "/user";

const accountAPI = {
    create: (values) => axiosInstance.post(baseAccount + "/create", values),
    update: (values) => axiosInstance.post(baseAccount + "/update", values),
    getById: (values) => axiosInstance.get(baseAccount + "/getById?accountId=" + values),
    getByRestaurantId: (values) => axiosInstance.get(baseAccount + "/getByRestaurantId?restaurantId=" + values),
    getAll: () => axiosInstance.get(baseAccount),
};

export default accountAPI;