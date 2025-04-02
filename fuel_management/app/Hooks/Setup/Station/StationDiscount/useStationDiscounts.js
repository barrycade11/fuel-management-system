import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const fetchStationDiscounts = async (stationId) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Station/${stationId}/Discounts`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};