import apiClient from "~/Constants/ApiClient";

export const createEmployeePhoto = async (employeeId, data) => {
    try {
        const response = await apiClient.post(`/Employee/${employeeId}/Photo`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};