import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const updateShift = async (id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/Shift/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};