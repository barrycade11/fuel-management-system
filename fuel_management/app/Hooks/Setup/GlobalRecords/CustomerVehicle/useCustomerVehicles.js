import apiClient from "~/Constants/ApiClient";

export const fetchCustomerVehicles = async () => {
    try {
        const response = await apiClient.get(`/CustomerVehicles`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};