import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const createSubDepartment = async (departmentId, data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/Department/${departmentId}/SubDepartment`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};