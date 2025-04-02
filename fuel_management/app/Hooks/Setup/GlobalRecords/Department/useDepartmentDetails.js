import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const fetchDepartmentDetails = async (id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Departments/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};