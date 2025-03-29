import apiClient from "~/Constants/ApiClient";

export const deleteSubDepartment = async (departmentId, id) => {
    try {
        const response = await apiClient.delete(`/Department/${DepartmentId}/SubDepartment/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};