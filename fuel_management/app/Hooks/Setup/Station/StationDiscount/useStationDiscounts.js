import apiClient from "~/Constants/ApiClient";

export const fetchStationDiscounts = async (stationId) => {
    try {
        const response = await apiClient.get(`/Station/${stationId}/Discounts`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};