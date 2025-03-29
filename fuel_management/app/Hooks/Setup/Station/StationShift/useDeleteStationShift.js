import apiClient from "~/Constants/ApiClient";

export const deleteStationShift = async (stationId, id) => {
    try {
        const response = await apiClient.delete(`/Station/${stationId}/Shift/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};