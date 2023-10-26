import axiosInstance from "./axiosInstance";

const restaurantAPI = {
    create: (values) => axiosInstance.post("/restaurant/create", values),
    getById: (values) => axiosInstance.get("restaurant/getById", values),
    getAll: () => axiosInstance.get("restaurant/"),
};

export default restaurantAPI;