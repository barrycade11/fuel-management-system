import apiClient from "~/Constants/ApiClient";

export const updateStationShift = async (stationId, id, data) => {
    try {
        const response = await apiClient.put(`/Station/${stationId}/Shift/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};