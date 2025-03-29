import apiClient from "~/Constants/ApiClient";

export const deleteEmployeePhoto = async (employeeId, id) => {
    try {
        const response = await apiClient.delete(`/Employee/${employeeId}/Photo/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};