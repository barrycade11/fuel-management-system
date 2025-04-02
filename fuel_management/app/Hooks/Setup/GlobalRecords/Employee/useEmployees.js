import apiClient from "~/Constants/ApiClient";

export const fetchEmployees = async () => {
    try {
        const response = await apiClient.get(`/Employees`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};