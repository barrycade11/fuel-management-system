import apiClient from "~/Constants/ApiClient";

export const fetchEmployeeContacts = async (employeeId) => {
    try {
        const response = await apiClient.get(`/Employee/${employeeId}/Contacts`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};