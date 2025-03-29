import apiClient from "~/Constants/ApiClient";

export const deleteCustomerVehicle = async (customerId, id) => {
    try {
        const response = await apiClient.delete(`/Customer/${customerId}/Vehicle/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};