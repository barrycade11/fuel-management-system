import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const deleteCustomerVehicle = async (customerId, id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/Customer/${customerId}/Vehicle/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};