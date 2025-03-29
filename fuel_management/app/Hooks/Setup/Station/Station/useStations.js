import apiClient from "~/Constants/ApiClient";

export const fetchStations = async () => {
    try {
        const response = await apiClient.get(`/Stations`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};