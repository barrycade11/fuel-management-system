import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const updateStationShift = async (stationId, id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/Station/${stationId}/Shift/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};