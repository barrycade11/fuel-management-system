import apiClient from "~/Constants/ApiClient";

export const fetchFuelMasters = async () => {
    try {
        const response = await apiClient.get(`/FuelMasters`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};