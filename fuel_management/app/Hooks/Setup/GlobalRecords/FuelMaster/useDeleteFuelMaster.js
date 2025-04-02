import apiClient from "~/Constants/ApiClient";

export const deleteFuelMaster = async (id) => {
    try {
        const response = await apiClient.delete(`/FuelMaster/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};