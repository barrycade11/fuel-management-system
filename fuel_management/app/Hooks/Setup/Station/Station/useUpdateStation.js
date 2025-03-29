import apiClient from "~/Constants/ApiClient";

export const updateStation = async (id, data) => {
    try {
        const response = await apiClient.put(`/Station/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};