import apiClient from "~/Constants/ApiClient";

export const createCustomerVehicle = async (customerId, data) => {
    try {
        const response = await apiClient.post(`/Customer/${customerId}/Vehicle`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};