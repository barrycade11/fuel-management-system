import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const fetchStationPaymentModes = async (stationId) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Station/${stationId}/PaymentModes`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};