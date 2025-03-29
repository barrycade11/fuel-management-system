import axios from "axios";
import useAuth from "~/Hooks/Auth/useAuth";

const API_BASE_URL = "http://localhost:5000"; // Backend URL
const { token } = useAuth.getState();

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  },
});

export default apiClient;
