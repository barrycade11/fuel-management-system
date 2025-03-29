import apiClient from "~/Constants/ApiClient";

export const deleteDepartment = async (id) => {
    try {
        const response = await apiClient.delete(`/Department/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};