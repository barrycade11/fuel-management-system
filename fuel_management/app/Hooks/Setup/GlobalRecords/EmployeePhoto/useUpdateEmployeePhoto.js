import apiClient from "~/Constants/ApiClient";

export const updateEmployeePhoto = async (employeeId, id, data) => {
    try {
        const response = await apiClient.put(`/Employee/${employeeId}/Photo/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};