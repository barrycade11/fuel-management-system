import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const deleteStationTank = async (stationId, id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/Station/${stationId}/Tank/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};