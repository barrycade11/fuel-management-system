import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const deleteStationDiscount = async (stationId, id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/Station/${stationId}/Discount/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};