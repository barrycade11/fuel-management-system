import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const deleteStationTankPump = async (stationId, tankId, id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/Station/${stationId}/Tank/${tankId}/Pump/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};