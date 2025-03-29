import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const createStationDepartment = async (stationId, data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/Station/${stationId}/Department`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};