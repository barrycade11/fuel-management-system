import apiClient from "~/Constants/ApiClient";

export const fetchFuelMasterDetails = async (id) => {
    try {
        const response = await apiClient.get(`/FuelMasters/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};