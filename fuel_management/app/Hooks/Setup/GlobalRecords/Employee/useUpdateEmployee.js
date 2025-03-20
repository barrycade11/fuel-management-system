import apiClient from "~/Constants/ApiClient";

export const updateEmployee = async (id, data) => {
    try {
        const response = await apiClient.put(`/Employee/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};