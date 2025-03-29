import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const fetchSubDepartments = async (departmentId) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Department/${departmentId}/SubDepartments`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};