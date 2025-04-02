import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const createEmployeeContact = async (employeeId, data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/Employee/${employeeId}/Contact`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};