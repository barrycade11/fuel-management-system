import apiClient from "~/Constants/ApiClient";

export const deleteEmployeeContact = async (employeeId, id) => {
    try {
        const response = await apiClient.delete(`/Employee/${employeeId}/Contact/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};