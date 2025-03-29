import apiClient from "~/Constants/ApiClient";

export const updateCustomerVehicle = async (customerId, id, data) => {
    try {
        const response = await apiClient.put(`/Customer/${customerId}/Vehicle/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};