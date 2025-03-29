import apiClient from "~/Constants/ApiClient";

export const createStationDiscount = async (stationId, data) => {
    try {
        const response = await apiClient.post(`/Station/${stationId}/Discount`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};