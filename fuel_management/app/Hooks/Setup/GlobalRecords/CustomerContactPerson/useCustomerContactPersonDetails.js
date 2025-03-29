import apiClient from "~/Constants/ApiClient";

export const fetchCustomerContactPersonDetails = async (customerId, id) => {
    try {
        const response = await apiClient.get(`/Customer/${customerId}/ContactPersons/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};