import apiClient from "~/Constants/ApiClient";

export const fetchCustomers = async () => {
    try {
        const response = await apiClient.get(`/Customers`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};