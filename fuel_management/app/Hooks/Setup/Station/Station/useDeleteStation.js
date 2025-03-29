import apiClient from "~/Constants/ApiClient";

export const deleteStation = async (id) => {
    try {
        const response = await apiClient.delete(`/Station/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};