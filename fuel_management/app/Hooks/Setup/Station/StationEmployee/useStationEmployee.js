import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const fetchStationEmployees = async (stationId, shiftId) => {
    try {
        const response = await apiClient.get(`${endPoints.Stations}/Station/${stationId}/${shiftId}/Employees`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};