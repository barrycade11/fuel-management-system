import apiClient from "~/Constants/ApiClient";

const fetchCustomers = async () => {
    try {
        const response = await apiClient.get(`/Setup/GlobalRecords/Customers`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const fetchCustomerDetails = async (id) => {
    try {
        const response = await apiClient.get(`/Setup/GlobalRecords/Customers/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const createCustomer = async (data) => {
    try {
        const response = await apiClient.post(`/Setup/GlobalRecords/Customer`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const updateCustomer = async (id, data) => {
    try {
        const response = await apiClient.put(`/Setup/GlobalRecords/Customer/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const deleteCustomer = async (id) => {
    try {
        const response = await apiClient.delete(`/Setup/GlobalRecords/Customer/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export { 
    fetchCustomers, 
    fetchCustomerDetails, 
    createCustomer, 
    updateCustomer, 
    deleteCustomer 
};