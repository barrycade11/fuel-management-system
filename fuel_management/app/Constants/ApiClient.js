import axios from "axios";
import useAuth from "~/Hooks/Auth/useAuth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_PORT = import.meta.env.VITE_API_PORT;

const { token } = useAuth.getState();

const apiClient = axios.create({
  baseURL: `http://${API_BASE_URL}:${API_PORT}`,
  headers: {
    "Content-Type": "application/json",
    // "Authorization": `Bearer ${token}`,
  },
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


export { apiClient };
