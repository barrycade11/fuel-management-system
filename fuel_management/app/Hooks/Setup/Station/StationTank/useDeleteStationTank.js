import apiClient from "~/Constants/ApiClient";

export const deleteStationTank = async (stationId, id) => {
    try {
        const response = await apiClient.delete(`/Station/${stationId}/Tank/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};