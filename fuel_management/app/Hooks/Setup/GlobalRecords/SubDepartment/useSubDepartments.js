import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

const fetchSubDepartments = async (departmentId) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Department/${departmentId}/SubDepartments`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const fetchSubDepartmentDetails = async (departmentId, id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Departments/${departmentId}/SubDepartments/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const createSubDepartment = async (departmentId, data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/Department/${departmentId}/SubDepartment`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const updateSubDepartment = async (departmentId, id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/Department/${departmentId}/SubDepartment/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const deleteSubDepartment = async (departmentId, id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/Department/${DepartmentId}/SubDepartment/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export { 
    fetchSubDepartments, 
    fetchSubDepartmentDetails, 
    createSubDepartment, 
    updateSubDepartment, 
    deleteSubDepartment 
};