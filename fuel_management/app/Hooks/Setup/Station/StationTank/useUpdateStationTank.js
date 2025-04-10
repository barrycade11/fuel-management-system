import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const updateStationTank = async (stationId, id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/Station/${stationId}/Tank/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};