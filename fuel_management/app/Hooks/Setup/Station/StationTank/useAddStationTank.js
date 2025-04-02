import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const createStationTank = async (stationId, data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/Station/${stationId}/Tank`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};