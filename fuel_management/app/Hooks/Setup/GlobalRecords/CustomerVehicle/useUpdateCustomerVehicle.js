import apiClient from "~/Constants/ApiClient";

export const updateCustomerVehicle = async (id, data) => {
    try {
        const response = await apiClient.put(`/CustomerVehicle/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};