import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

const useGenerateCustomerCode = (resource) => {
    return useQuery({
        queryKey: [resource],
        queryFn: async () => {
            const response = await apiClient.get(`${endPoints.GlobalRecords}/${resource}/generate-cus-code`);
            return response.data;
        },
    });
};

const fetchCustomers = async () => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Customers`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const fetchCustomerDetails = async (id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Customers/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const createCustomer = async (data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/Customer`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const updateCustomer = async (id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/Customer/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const deleteCustomer = async (id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/Customer/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export { 
    useGenerateCustomerCode,
    fetchCustomers, 
    fetchCustomerDetails, 
    createCustomer, 
    updateCustomer, 
    deleteCustomer 
};