import apiClient from "~/Constants/ApiClient";

export const deleteCustomerContactPerson = async (id) => {
    try {
        const response = await apiClient.delete(`/CustomerContactPerson/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};