import apiClient from "~/Constants/ApiClient";

export const fetchCustomerVehicleDetails = async (customerId, id) => {
    try {
        const response = await apiClient.get(`/Customer/${customerId}/Vehicles/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};