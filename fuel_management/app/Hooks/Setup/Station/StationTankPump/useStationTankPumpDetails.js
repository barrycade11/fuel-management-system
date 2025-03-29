import apiClient from "~/Constants/ApiClient";

export const fetchStationTankPumpDetails = async (stationId, tankId, id) => {
    try {
        const response = await apiClient.get(`/Station/${stationId}/Tank/${tankId}/Pumps/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};