import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const updateStationDepartment = async (stationId, id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/Station/${stationId}/Department/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};