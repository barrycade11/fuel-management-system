import apiClient from "~/Constants/ApiClient";

export const fetchStationDepartments = async (stationId) => {
    try {
        const response = await apiClient.get(`/Station/${stationId}/Departments`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};