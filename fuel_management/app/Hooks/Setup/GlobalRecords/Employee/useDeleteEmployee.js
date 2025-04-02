import apiClient from "~/Constants/ApiClient";

export const deleteEmployee = async (id) => {
    try {
        const response = await apiClient.delete(`/Employee/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};