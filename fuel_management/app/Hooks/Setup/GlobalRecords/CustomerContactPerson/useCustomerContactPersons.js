import apiClient from "~/Constants/ApiClient";

export const fetchCustomerContactPersons = async () => {
    try {
        const response = await apiClient.get(`/CustomerContactPersons`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};