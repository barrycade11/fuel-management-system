import apiClient from "~/Constants/ApiClient";

export const fetchStationTankPumps = async (stationId, tankId) => {
    try {
        const response = await apiClient.get(`/Station/${stationId}/Tank/${tankId}/TankPumps`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};