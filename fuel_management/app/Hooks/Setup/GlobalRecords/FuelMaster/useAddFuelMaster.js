import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const createFuelMaster = async (data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/FuelMaster`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};