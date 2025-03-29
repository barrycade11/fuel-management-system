import apiClient from "~/Constants/ApiClient";

export const fetchStationPaymentModeDetails = async (stationId, id) => {
    try {
        const response = await apiClient.get(`/Station/${stationId}/PaymentModes/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};