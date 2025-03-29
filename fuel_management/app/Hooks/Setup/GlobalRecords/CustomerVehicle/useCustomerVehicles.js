import apiClient from "~/Constants/ApiClient";

export const fetchCustomerVehicles = async (customerId) => {
    try {
        const response = await apiClient.get(`/Customer/${customerId}/Vehicles`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};