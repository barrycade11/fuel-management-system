import apiClient from "~/Constants/ApiClient";

export const updateShift = async (id, data) => {
    try {
        const response = await apiClient.put(`/Shift/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};