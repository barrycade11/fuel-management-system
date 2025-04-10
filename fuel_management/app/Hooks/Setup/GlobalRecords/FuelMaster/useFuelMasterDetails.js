import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const fetchFuelMasterDetails = async (id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/FuelMasters/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};