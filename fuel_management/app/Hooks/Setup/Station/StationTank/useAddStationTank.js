import apiClient from "~/Constants/ApiClient";

export const createStationTank = async (stationId, data) => {
    try {
        const response = await apiClient.post(`/Station/${stationId}/Tank`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};