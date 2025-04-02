import apiClient from "~/Constants/ApiClient";

export const fetchPaymentModes = async () => {
    try {
        const response = await apiClient.get(`/PaymentModes`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};