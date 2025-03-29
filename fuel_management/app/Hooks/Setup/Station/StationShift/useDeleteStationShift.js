import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const deleteStationShift = async (stationId, id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/Station/${stationId}/Shift/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};