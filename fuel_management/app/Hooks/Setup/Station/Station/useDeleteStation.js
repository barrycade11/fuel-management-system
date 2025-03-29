import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const deleteStation = async (id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/Station/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};