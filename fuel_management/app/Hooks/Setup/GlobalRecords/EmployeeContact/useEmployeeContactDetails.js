import apiClient from "~/Constants/ApiClient";

export const fetchEmployeeContactDetails = async (id) => {
    try {
        const response = await apiClient.get(`/EmployeeContacts/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};