import apiClient from "~/Constants/ApiClient";

export const fetchStationShifts = async (stationId) => {
    try {
        const response = await apiClient.get(`/Station/${stationId}/Shifts`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};