import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const updateStationTank = async (stationId, tankId, id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/Station/${stationId}/Tank/${tankId}/Pump/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};