import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const fetchCustomerVehicleDetails = async (customerId, id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Customer/${customerId}/Vehicles/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};