import apiClient from "~/Constants/ApiClient";

export const createCustomerContactPerson = async (customerId, data) => {
    try {
        const response = await apiClient.post(`/Customer/${customerId}/ContactPerson`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};