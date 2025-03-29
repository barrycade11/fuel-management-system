import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const createShift = async (data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/Shift`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};