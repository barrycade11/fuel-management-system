import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const updateEmployeeContact = async (employeeId, id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/Employee/${employeeId}/Contact/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};