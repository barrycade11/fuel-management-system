import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const fetchShiftDetails = async (id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Shifts/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};