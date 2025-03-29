import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const deleteSubDepartment = async (departmentId, id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/Department/${DepartmentId}/SubDepartment/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};