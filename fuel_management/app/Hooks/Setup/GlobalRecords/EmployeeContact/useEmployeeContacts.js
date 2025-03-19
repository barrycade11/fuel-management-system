import apiClient from "~/Constants/ApiClient";

export const fetchEmployeeContacts = async () => {
    try {
        const response = await apiClient.get(`/EmployeeContacts`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};