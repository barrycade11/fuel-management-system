import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

const fetchEmployeePhotos = async (employeeId) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Employee/${employeeId}/Photos`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const fetchEmployeePhotoDetails = async (employeeId, id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Employee/${employeeId}/Photos/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const createEmployeePhoto = async (employeeId, data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/Employee/${employeeId}/Photo`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const updateEmployeePhoto = async (employeeId, id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/Employee/${employeeId}/Photo/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const deleteEmployeePhoto = async (employeeId, id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/Employee/${employeeId}/Photo/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export { 
    fetchEmployeePhotos, 
    fetchEmployeePhotoDetails, 
    createEmployeePhoto, 
    updateEmployeePhoto, 
    deleteEmployeePhoto 
};