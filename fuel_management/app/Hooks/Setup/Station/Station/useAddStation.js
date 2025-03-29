import apiClient from "~/Constants/ApiClient";

export const createStation = async (data) => {
    try {
        const response = await apiClient.post(`/Station`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};