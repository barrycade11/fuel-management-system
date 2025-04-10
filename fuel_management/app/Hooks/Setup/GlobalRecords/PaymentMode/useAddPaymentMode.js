import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const createPaymentMode = async (userData) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/PaymentMode`, userData);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};