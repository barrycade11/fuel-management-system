import apiClient from "~/Constants/ApiClient";

export const updateStationTank = async (stationId, tankId, id, data) => {
    try {
        const response = await apiClient.put(`/Station/${stationId}/Tank/${tankId}/Pump/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};