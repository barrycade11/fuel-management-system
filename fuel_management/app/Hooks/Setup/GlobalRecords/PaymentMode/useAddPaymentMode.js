import apiClient from "~/Constants/ApiClient";

export const createFuels = async (userData) => {
    try {
        const response = await apiClient.post(`/PaymentMode`, userData);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};