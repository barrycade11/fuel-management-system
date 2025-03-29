import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const createStationTankPump = async (stationId, tankId, data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/Station/${stationId}/Tank/${tankId}/Pump`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};