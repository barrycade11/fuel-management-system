import apiClient from "~/Constants/ApiClient";

export const fetchEmployeeContactDetails = async (employeeId, id) => {
    try {
        const response = await apiClient.get(`/Employee/${employeeId}/Contacts/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};