import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const createStationShift = async (stationId, data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/Station/${stationId}/Shift`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};