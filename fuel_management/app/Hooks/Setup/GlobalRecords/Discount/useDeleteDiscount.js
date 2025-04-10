import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const deleteDiscount = async (id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/Discount/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};