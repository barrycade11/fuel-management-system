import apiClient from "~/Constants/ApiClient";

export const createEmployeeContact = async (employeeId, data) => {
    try {
        const response = await apiClient.post(`/Employee/${employeeId}/Contact`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};