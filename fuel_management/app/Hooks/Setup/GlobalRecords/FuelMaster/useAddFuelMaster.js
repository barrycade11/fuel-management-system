import apiClient from "~/Constants/ApiClient";

export const createFuels = async (data) => {
    try {
        const response = await apiClient.post(`/FuelMaster`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};