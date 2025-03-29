import apiClient from "~/Constants/ApiClient";

export const createStationPaymentMode = async (stationId, data) => {
    try {
        const response = await apiClient.post(`/Station/${stationId}/PaymentMode`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};