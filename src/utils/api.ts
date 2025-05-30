import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "https://shortify-1-br8t.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
