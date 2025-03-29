import apiClient from "~/Constants/ApiClient";

export const fetchStationDetails = async (id) => {
    try {
        const response = await apiClient.get(`/Stations/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};