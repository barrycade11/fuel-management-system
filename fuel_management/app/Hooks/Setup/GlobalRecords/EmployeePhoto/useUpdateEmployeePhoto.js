import apiClient from "~/Constants/ApiClient";

export const updateEmployeePhoto = async (id, data) => {
    try {
        const response = await apiClient.put(`/EmployeePhoto/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};