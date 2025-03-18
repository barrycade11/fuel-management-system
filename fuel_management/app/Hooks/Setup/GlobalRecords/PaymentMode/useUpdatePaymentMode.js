import apiClient from "~/Constants/ApiClient";

export const updatePaymentMode = async (id, data) => {
    try {
        const response = await apiClient.put(`/PaymentMode/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};