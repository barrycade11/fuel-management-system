import apiClient from "~/Constants/ApiClient";

export const createEmployeeContact = async (data) => {
    try {
        const response = await apiClient.post(`/EmployeeContact`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};