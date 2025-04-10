import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const deleteEmployeeContact = async (employeeId, id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/Employee/${employeeId}/Contact/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};