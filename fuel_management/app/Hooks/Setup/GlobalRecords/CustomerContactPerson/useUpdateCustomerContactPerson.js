import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const updateCustomerContactPerson = async (customerId, id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/Customer/${customerId}/ContactPerson/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};