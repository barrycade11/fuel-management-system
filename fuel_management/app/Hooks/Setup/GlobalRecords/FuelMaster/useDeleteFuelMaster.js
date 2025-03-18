import apiClient from "~/Constants/ApiClient";

export const updateFuels = async (id) => {
    try {
        const response = await apiClient.delete(`/FuelMaster/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};