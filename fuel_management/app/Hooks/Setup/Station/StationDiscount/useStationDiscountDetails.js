import apiClient from "~/Constants/ApiClient";

export const fetchStationDiscountDetails = async (stationId, id) => {
    try {
        const response = await apiClient.get(`/Station/${stationId}/Discounts/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};