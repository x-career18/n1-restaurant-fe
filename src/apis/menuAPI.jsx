import axiosInstance from "./axiosInstance";

const base = "/menuItem";

const menuItemAPI = {
    create: (values) => axiosInstance.post(base + "/create", values),
    update: (values) => axiosInstance.post(base + "/update", values),
    getById: (values) => axiosInstance.get(base + "/getById?menuItemId=" + values),
    getAll: () => axiosInstance.get(base),
};

export default menuItemAPI;