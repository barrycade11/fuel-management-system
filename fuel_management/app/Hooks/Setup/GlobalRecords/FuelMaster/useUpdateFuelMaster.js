import apiClient from "~/Constants/ApiClient";

export const updateFuelMaster = async (id, data) => {
    try {
        const response = await apiClient.put(`/FuelMaster/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};