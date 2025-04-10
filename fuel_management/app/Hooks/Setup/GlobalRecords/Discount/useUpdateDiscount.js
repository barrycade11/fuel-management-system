import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const updateDiscount = async (id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/Discount/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};