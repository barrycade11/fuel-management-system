import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const deleteDepartment = async (id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/Department/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};