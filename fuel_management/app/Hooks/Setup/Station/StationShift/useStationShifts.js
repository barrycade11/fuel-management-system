import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const fetchStationShifts = async (stationId) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Station/${stationId}/Shifts`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};