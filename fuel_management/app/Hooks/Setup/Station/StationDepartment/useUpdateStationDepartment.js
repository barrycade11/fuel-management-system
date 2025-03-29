import apiClient from "~/Constants/ApiClient";

export const updateStationDepartment = async (stationId, id, data) => {
    try {
        const response = await apiClient.put(`/Station/${stationId}/Department/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};