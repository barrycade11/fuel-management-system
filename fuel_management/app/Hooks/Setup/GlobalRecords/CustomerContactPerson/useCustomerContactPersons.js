import apiClient from "~/Constants/ApiClient";

export const fetchCustomerContactPersons = async (customerId) => {
    try {
        const response = await apiClient.get(`/Customer/${customerId}/ContactPersons`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};