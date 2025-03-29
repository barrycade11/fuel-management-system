import axios from "axios";
import useAuth from "~/Hooks/Auth/useAuth";

const API_BASE_URL = "http://localhost:5000"; // Backend URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use(
  (config) => {
    const { token } = useAuth.getState();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("Error in request interceptor:", error);
    return Promise.reject(error);
  }
);

export default apiClient;
