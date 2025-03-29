import apiClient from "~/Constants/ApiClient";

export const fetchStationTanks = async (stationId) => {
    try {
        const response = await apiClient.get(`/Station/${stationId}/Tanks`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};