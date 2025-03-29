import apiClient from "~/Constants/ApiClient";

export const deleteStationTankPump = async (stationId, tankId, id) => {
    try {
        const response = await apiClient.delete(`/Station/${stationId}/Tank/${tankId}/Pump/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};