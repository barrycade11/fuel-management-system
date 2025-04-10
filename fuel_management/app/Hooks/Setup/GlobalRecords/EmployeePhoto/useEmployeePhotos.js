import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const fetchEmployeePhotos = async (employeeId) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Employee/${employeeId}/Photos`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};