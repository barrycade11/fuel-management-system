import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const createStationDiscount = async (stationId, data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/Station/${stationId}/Discount`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};