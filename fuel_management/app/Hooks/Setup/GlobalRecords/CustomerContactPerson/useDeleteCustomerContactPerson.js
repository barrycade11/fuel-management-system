import apiClient from "~/Constants/ApiClient";

export const deleteCustomerContactPerson = async (customerId, id) => {
    try {
        const response = await apiClient.delete(`/Customer/${customerId}/ContactPerson/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};