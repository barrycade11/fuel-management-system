import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const updateEmployee = async (id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/Employee/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};