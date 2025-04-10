import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const createCustomer = async (data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/Customer`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};
