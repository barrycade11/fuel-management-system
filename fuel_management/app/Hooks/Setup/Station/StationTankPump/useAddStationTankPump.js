import apiClient from "~/Constants/ApiClient";

export const createStationTankPump = async (stationId, tankId, data) => {
    try {
        const response = await apiClient.post(`/Station/${stationId}/Tank/${tankId}/Pump`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};