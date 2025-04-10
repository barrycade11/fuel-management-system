import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const fetchDiscountDetails = async (id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Discounts/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};