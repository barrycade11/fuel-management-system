import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const deletePaymentMode = async (id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/PaymentMode/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};