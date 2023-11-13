import axiosInstance from "./axiosInstance";

const base = "/otp";

const OtpAPI = {
    create: (phone) => axiosInstance.get(base + "/create?phoneNo=" + phone),
    verify: (phone, pin) => axiosInstance.get(base + "/verify?phoneNo=" + phone + "&otp=" + pin),
};

export default OtpAPI;