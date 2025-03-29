import apiClient from "~/Constants/ApiClient";

export const updateDepartment = async (id, data) => {
    try {
        const response = await apiClient.put(`/Department/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};