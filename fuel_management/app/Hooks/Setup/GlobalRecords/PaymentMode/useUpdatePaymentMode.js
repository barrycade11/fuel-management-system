import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const updatePaymentMode = async (id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/PaymentMode/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};