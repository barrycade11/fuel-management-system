import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const fetchCustomerContactPersons = async (customerId) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Customer/${customerId}/ContactPersons`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};