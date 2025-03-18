import apiClient from "~/Constants/ApiClient";

export const updateFuels = async (id, data) => {
    try {
        const response = await apiClient.put(`/FuelMaster/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};