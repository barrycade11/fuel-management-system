import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const fetchStationShiftDetails = async (stationId, id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Station/${stationId}/Shifts/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};