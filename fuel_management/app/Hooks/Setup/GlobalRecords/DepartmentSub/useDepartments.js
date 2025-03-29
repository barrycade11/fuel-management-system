import apiClient from "~/Constants/ApiClient";

export const fetchSubDepartments = async (departmentId) => {
    try {
        const response = await apiClient.get(`/Department/${departmentId}/SubDepartments`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};