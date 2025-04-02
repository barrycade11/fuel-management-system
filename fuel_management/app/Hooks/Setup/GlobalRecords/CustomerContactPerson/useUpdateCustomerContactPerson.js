import apiClient from "~/Constants/ApiClient";

export const updateCustomerContactPerson = async (id, data) => {
    try {
        const response = await apiClient.put(`/CustomerContactPerson/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};