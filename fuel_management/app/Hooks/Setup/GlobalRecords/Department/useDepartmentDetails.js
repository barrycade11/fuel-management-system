import apiClient from "~/Constants/ApiClient";

export const fetchDepartmentDetails = async (id) => {
    try {
        const response = await apiClient.get(`/Departments/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};