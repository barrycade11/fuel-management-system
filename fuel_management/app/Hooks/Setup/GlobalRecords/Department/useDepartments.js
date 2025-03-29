import apiClient from "~/Constants/ApiClient";

export const fetchDepartments = async () => {
    try {
        const response = await apiClient.get(`/Departments`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};