import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const updateCustomerVehicle = async (customerId, id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/Customer/${customerId}/Vehicle/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};