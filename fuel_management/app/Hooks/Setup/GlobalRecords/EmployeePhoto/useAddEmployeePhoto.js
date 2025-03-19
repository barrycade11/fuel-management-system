import apiClient from "~/Constants/ApiClient";

export const createEmployeePhoto = async (data) => {
    try {
        const response = await apiClient.post(`/EmployeePhoto`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};