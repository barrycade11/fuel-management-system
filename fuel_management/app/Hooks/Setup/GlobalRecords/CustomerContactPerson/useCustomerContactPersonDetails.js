import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const fetchCustomerContactPersonDetails = async (customerId, id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Customer/${customerId}/ContactPersons/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};