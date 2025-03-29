import apiClient from "~/Constants/ApiClient";

export const fetchSubDepartmentDetails = async (departmentId, id) => {
    try {
        const response = await apiClient.get(`/Departments/${departmentId}/SubDepartments/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};