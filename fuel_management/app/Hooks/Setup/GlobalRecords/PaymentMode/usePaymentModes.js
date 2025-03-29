import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

const fetchPaymentModes= async () => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/PaymentModes`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const fetchPaymentModeDetails = async (id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/PaymentModes/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const createPaymentMode = async (data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/PaymentMode`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const updatePaymentMode = async (id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/PaymentMode/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const deletePaymentMode = async (id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/PaymentMode/${id}`);

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