import apiClient from "~/Constants/ApiClient";

export const createCustomerContactPerson = async (data) => {
    try {
        const response = await apiClient.post(`/CustomerContactPerson`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};