import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const createEmployeePhoto = async (employeeId, data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/Employee/${employeeId}/Photo`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};