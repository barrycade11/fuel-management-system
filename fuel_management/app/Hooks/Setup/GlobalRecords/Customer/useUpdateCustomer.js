import apiClient from "~/Constants/ApiClient";

export const updateCustomer = async (id, data) => {
    try {
        const response = await apiClient.put(`/Customer/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};