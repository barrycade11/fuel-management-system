import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const createDepartment = async (data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/Department`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};