import apiClient from "~/Constants/ApiClient";

export const fetchCustomerVehicleDetails = async (id) => {
    try {
        const response = await apiClient.get(`/CustomerVehicles/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};