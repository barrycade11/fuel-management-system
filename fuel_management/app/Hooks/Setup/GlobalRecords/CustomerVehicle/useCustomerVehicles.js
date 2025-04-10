import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const fetchCustomerVehicles = async (customerId) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Customer/${customerId}/Vehicles`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};