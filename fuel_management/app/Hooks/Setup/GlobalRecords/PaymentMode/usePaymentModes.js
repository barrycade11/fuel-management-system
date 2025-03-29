import apiClient from "~/Constants/ApiClient";

const fetchPaymentModes= async () => {
    try {
        const response = await apiClient.get(`/Setup/GlobalRecords/PaymentModes`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const fetchPaymentModeDetails = async (id) => {
    try {
        const response = await apiClient.get(`/Setup/GlobalRecords/PaymentModes/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const createPaymentMode = async (data) => {
    try {
        const response = await apiClient.post(`/Setup/GlobalRecords/PaymentMode`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const updatePaymentMode = async (id, data) => {
    try {
        const response = await apiClient.put(`/Setup/GlobalRecords/PaymentMode/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const deletePaymentMode = async (id) => {
    try {
        const response = await apiClient.delete(`/Setup/GlobalRecords/PaymentMode/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export { 
    fetchPaymentModes, 
    fetchPaymentModeDetails, 
    createPaymentMode, 
    updatePaymentMode, 
    deletePaymentMode 
};