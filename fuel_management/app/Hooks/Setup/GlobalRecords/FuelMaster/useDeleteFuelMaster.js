import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const deleteFuelMaster = async (id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/FuelMaster/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};