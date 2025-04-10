import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const updateDepartment = async (id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/Department/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};