import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const deleteShift = async (id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/Shift/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};