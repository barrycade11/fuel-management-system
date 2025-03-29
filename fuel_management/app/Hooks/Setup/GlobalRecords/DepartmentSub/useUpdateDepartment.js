import apiClient from "~/Constants/ApiClient";

export const updateSubDepartment = async (departmentId, id, data) => {
    try {
        const response = await apiClient.put(`/Department/${departmentId}/SubDepartment/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};