import axiosInstance from "./axiosInstance";

const comboAPI = {
    create: (values) => axiosInstance.post("/combo/create", values),
    getById: (values) => axiosInstance.get("combo/getById", values),
    getAll: () => axiosInstance.get("combo/"),
};

export default comboAPI;