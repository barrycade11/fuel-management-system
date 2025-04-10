import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const deleteStationPaymentMode = async (stationId, id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/Station/${stationId}/PaymentMode/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};