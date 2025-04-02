import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

export const fetchEmployeeContacts = async (employeeId) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Employee/${employeeId}/Contacts`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};