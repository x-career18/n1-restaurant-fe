import axiosInstance from "./axiosInstance";

const baseRestaurant = "/restaurant";

const restaurantAPI = {
    create: (values) => axiosInstance.post(baseRestaurant + "/create", values),
    getById: (values) => axiosInstance.get(baseRestaurant + "/getById?restaurantId=" + values),
    getAll: () => axiosInstance.get(baseRestaurant),
};

export default restaurantAPI;