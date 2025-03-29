import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const fetchStationDiscountDetails = async (stationId, id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Station/${stationId}/Discounts/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};