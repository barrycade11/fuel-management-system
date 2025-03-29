import apiClient from "~/Constants/ApiClient";

export const createStationShift = async (stationId, data) => {
    try {
        const response = await apiClient.post(`/Station/${stationId}/Shift`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};