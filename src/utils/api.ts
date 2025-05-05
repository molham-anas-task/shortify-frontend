import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "https://link-shortener-server-u3c8.onrender.com/api",
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
