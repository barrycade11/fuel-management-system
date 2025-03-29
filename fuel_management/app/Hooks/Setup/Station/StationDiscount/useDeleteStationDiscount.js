import apiClient from "~/Constants/ApiClient";

export const deleteStationDiscount = async (stationId, id) => {
    try {
        const response = await apiClient.delete(`/Station/${stationId}/Discount/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};