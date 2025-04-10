import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const fetchStationTankPumps = async (stationId, tankId) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Station/${stationId}/Tank/${tankId}/TankPumps`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};