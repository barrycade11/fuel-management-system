import apiClient from "~/Constants/ApiClient";

export const createPaymentMode = async (userData) => {
    try {
        const response = await apiClient.post(`/PaymentMode`, userData);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};