import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const deleteCustomer = async (id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/Customer/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};