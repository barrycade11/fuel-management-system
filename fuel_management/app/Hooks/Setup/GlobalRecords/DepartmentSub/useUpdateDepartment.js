import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const updateSubDepartment = async (departmentId, id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/Department/${departmentId}/SubDepartment/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};