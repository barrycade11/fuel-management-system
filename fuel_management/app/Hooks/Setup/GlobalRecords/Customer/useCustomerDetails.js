import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const fetchCustomerDetails = async (id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Customers/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};