import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const createDiscount = async (data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/Discount`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};