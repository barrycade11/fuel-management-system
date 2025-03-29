import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const fetchStationDepartments = async (stationId) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Station/${stationId}/Departments`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};