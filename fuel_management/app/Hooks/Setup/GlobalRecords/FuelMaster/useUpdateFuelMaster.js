import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const updateFuelMaster = async (id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/FuelMaster/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};