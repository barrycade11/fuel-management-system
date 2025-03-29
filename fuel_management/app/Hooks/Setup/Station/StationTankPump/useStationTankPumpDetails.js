import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const fetchStationTankPumpDetails = async (stationId, tankId, id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Station/${stationId}/Tank/${tankId}/Pumps/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};