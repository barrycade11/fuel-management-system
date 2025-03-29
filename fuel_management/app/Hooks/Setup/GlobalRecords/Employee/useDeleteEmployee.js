import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const deleteEmployee = async (id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/Employee/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};