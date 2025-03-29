import apiClient from "~/Constants/ApiClient";

export const fetchStationPaymentModes = async (stationId) => {
    try {
        const response = await apiClient.get(`/Station/${stationId}/PaymentModes`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};