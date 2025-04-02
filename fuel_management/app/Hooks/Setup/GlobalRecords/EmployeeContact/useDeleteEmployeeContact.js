import apiClient from "~/Constants/ApiClient";

export const deleteEmployeeContact = async (id) => {
    try {
        const response = await apiClient.delete(`/EmployeeContact/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};