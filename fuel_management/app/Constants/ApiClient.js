import axios from "axios";
import useAuth from "~/Hooks/Auth/useAuth";

const API_BASE_URL = import.meta.env.API_BASE_URL;
const API_PORT = import.meta.env.API_PORT;

const { token } = useAuth.getState();

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}:${API_PORT}`,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  },
});

export { apiClient };
