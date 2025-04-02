import apiClient from "~/Constants/ApiClient";

export const deleteEmployeePhoto = async (id) => {
    try {
        const response = await apiClient.delete(`/EmployeePhoto/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};