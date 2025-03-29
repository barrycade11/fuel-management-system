import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const createStation = async (data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/Station`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};