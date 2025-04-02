import apiClient from "~/Constants/ApiClient";

export const fetchCustomerContactPersonDetails = async (id) => {
    try {
        const response = await apiClient.get(`/CustomerContactPersons/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};