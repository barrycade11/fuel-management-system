import apiClient from "~/Constants/ApiClient";

export const deleteShift = async (id) => {
    try {
        const response = await apiClient.delete(`/Shift/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};