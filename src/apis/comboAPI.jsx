import axiosInstance from "./axiosInstance";

const baseCombo = "/combo";

const comboAPI = {
    create: (values) => axiosInstance.post(baseCombo + "/create", values),
    update: (values) => axiosInstance.post(baseCombo + "/update", values),
    getById: (values) => axiosInstance.get(baseCombo + "/getById?comboId=" + values),
    getAll: () => axiosInstance.get(baseCombo),
};

export default comboAPI;