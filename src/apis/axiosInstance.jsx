import axios from "axios";

const BASE_URL = "http://localhost:3001/api/v1";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, //over 5 minutes stop calling
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers["accept-token"] = accessToken;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  response => {
      return response
  },
  error => {
      if (!error.response) {
          console.log("Please check your internet connection.");
          // error.errorStatus = 'Error: Network Error';
      }

      return Promise.reject(error)
  }
)

export default axiosInstance;
