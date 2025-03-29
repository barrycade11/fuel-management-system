import apiClient from "~/Constants/ApiClient";

export const updateStationPaymentMode = async (stationId, id, data) => {
    try {
        const response = await apiClient.put(`/Station/${stationId}/PaymentMode/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};