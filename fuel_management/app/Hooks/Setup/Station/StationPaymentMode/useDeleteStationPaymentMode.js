import apiClient from "~/Constants/ApiClient";

export const deleteStationPaymentMode = async (stationId, id) => {
    try {
        const response = await apiClient.delete(`/Station/${stationId}/PaymentMode/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};