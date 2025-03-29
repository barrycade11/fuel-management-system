import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const fetchStations = async () => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Stations`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};