import apiClient from "~/Constants/ApiClient";

export const createStationDepartment = async (stationId, data) => {
    try {
        const response = await apiClient.post(`/Station/${stationId}/Department`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};