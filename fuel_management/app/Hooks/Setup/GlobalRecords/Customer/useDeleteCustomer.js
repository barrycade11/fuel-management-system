import apiClient from "~/Constants/ApiClient";

export const deleteCustomer = async (id) => {
    try {
        const response = await apiClient.delete(`/Customer/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};