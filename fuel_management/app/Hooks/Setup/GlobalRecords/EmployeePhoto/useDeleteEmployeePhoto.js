import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const deleteEmployeePhoto = async (employeeId, id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/Employee/${employeeId}/Photo/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};