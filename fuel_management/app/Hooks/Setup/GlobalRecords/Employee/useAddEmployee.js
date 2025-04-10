import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const createEmployee = async (data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/Employee`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};