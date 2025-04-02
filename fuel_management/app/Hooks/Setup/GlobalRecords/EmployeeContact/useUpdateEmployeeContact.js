import apiClient from "~/Constants/ApiClient";

export const updateEmployeeContact = async (id, data) => {
    try {
        const response = await apiClient.put(`/EmployeeContact/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};