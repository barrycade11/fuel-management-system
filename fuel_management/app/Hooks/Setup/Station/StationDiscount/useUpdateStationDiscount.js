import apiClient from "~/Constants/ApiClient";

export const updateStationDiscount = async (stationId, id, data) => {
    try {
        const response = await apiClient.put(`/Station/${stationId}/Discount/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};