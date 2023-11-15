import axiosInstance from "./axiosInstance";

const base = "/image";

const imageAPI = {
    upload: (values) => axiosInstance.post(base + "/create", values),
};
export default imageAPI;
