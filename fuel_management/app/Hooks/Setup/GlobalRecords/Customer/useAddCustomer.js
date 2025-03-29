import apiClient from "~/Constants/ApiClient";

export const createCustomer = async (data) => {
    try {
        const response = await apiClient.post(`/Customer`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};
