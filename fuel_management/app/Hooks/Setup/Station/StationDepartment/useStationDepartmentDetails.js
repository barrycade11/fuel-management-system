import apiClient from "~/Constants/ApiClient";

export const fetchStationDepartmentDetails = async (stationId, id) => {
    try {
        const response = await apiClient.get(`/Station/${stationId}/Departments/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};