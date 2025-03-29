import apiClient from "~/Constants/ApiClient";

export const createSubDepartment = async (departmentId, data) => {
    try {
        const response = await apiClient.post(`/Department/${departmentId}/SubDepartment`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};