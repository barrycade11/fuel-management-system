import apiClient from "~/Constants/ApiClient";

export const updateCustomerContactPerson = async (customerId, id, data) => {
    try {
        const response = await apiClient.put(`/Customer/${customerId}/ContactPerson/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};