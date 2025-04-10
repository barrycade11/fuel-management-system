import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const fetchStationDetails = async (id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Stations/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};