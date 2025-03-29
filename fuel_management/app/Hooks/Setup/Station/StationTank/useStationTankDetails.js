import apiClient from "~/Constants/ApiClient";

export const fetchStationTankDetails = async (stationId, id) => {
    try {
        const response = await apiClient.get(`/Station/${stationId}/Tanks/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};