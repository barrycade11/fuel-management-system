import apiClient from "~/Constants/ApiClient";

export const fetchCustomerDetails = async (id) => {
    try {
        const response = await apiClient.get(`/Customers/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};