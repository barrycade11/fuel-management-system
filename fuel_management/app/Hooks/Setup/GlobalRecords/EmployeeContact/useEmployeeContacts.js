import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

const fetchEmployeeContacts = async (employeeId) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Employee/${employeeId}/Contacts`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const fetchEmployeeContactDetails = async (employeeId, id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Employee/${employeeId}/Contacts/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const createEmployeeContact = async (employeeId, data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/Employee/${employeeId}/Contact`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const updateEmployeeContact = async (employeeId, id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/Employee/${employeeId}/Contact/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const deleteEmployeeContact = async (employeeId, id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/Employee/${employeeId}/Contact/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export { 
    fetchEmployeeContacts, 
    fetchEmployeeContactDetails, 
    createEmployeeContact, 
    updateEmployeeContact, 
    deleteEmployeeContact 
};