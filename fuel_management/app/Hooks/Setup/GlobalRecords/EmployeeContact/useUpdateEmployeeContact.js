import apiClient from "~/Constants/ApiClient";

export const updateEmployeeContact = async (employeeId, id, data) => {
    try {
        const response = await apiClient.put(`/Employee/${employeeId}/Contact/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};