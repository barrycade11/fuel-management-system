import apiClient from "~/Constants/ApiClient";

export const deleteCustomerVehicle = async (id) => {
    try {
        const response = await apiClient.delete(`/CustomerVehicle/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};