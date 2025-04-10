import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const updateCustomer = async (id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/Customer/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};