import apiClient from "~/Constants/ApiClient";

export const fetchStationShiftDetails = async (stationId, id) => {
    try {
        const response = await apiClient.get(`/Station/${stationId}/Shifts/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};