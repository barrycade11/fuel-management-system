import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const fetchPaymentModeDetails = async (id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/PaymentModes/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};