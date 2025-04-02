import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const createCustomerVehicle = async (customerId, data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/Customer/${customerId}/Vehicle`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};