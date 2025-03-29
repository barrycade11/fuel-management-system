import apiClient from "~/Constants/ApiClient";

export const deleteStationDepartment = async (stationId, id) => {
    try {
        const response = await apiClient.delete(`/Station/${stationId}/Department/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};