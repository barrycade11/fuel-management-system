import apiClient from "~/Constants/ApiClient";

export const createCustomerVehicle = async (data) => {
    try {
        const response = await apiClient.post(`/CustomerVehicle`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};