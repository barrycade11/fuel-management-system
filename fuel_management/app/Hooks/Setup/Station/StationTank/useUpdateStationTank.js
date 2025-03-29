import apiClient from "~/Constants/ApiClient";

export const updateStationTank = async (stationId, id, data) => {
    try {
        const response = await apiClient.put(`/Station/${stationId}/Tank/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};