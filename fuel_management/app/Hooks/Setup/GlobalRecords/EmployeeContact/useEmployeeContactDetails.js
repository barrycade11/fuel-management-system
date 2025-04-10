import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const fetchEmployeeContactDetails = async (employeeId, id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Employee/${employeeId}/Contacts/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};