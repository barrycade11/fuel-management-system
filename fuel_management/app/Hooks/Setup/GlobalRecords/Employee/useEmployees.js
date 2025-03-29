import apiClient from "~/Constants/ApiClient";

const fetchEmployees = async () => {
    try {
        const response = await apiClient.get(`/Setup/GlobalRecords/Employees`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const fetchEmployeeDetails = async (id) => {
    try {
        const response = await apiClient.get(`/Setup/GlobalRecords/Employees/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const createEmployee = async (data) => {
    try {
        const response = await apiClient.post(`/Setup/GlobalRecords/Employee`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const updateEmployee = async (id, data) => {
    try {
        const response = await apiClient.put(`/Setup/GlobalRecords/Employee/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const deleteEmployee = async (id) => {
    try {
        const response = await apiClient.delete(`/Setup/GlobalRecords/Employee/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export { 
    fetchEmployees, 
    fetchEmployeeDetails, 
    createEmployee, 
    updateEmployee, 
    deleteEmployee 
};