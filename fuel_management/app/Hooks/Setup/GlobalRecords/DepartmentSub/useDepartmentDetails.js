import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const fetchSubDepartmentDetails = async (departmentId, id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Departments/${departmentId}/SubDepartments/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};