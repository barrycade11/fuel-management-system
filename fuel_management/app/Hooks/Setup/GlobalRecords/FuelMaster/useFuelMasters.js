import apiClient from "~/Constants/ApiClient";

export const fetchFuels = async () => {
    try {
        const response = await apiClient.get(`/FuelMasters`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};