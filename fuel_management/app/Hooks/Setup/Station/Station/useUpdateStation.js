import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const updateStation = async (id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/Station/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};