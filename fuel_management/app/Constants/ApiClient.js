import axios from "axios";
import useAuth from "~/Hooks/Auth/useAuth";

const API_BASE_URL = "http://46.202.164.246:5000"; // Backend URL
// const API_BASE_URL = "http://localhost:5000"; // Backend URL
const { token } = useAuth.getState();

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  },
});

export { apiClient };
