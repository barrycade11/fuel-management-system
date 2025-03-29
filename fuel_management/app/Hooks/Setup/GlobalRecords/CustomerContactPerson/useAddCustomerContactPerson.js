import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const createCustomerContactPerson = async (customerId, data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/Customer/${customerId}/ContactPerson`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};