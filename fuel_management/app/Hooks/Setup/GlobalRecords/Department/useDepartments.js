import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const fetchDepartments = async () => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Departments`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};