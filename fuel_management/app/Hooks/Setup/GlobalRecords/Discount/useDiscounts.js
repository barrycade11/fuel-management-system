import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

const fetchDiscounts = async () => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Discounts`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const fetchDiscountDetails = async (id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Discounts/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const createDiscount = async (data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/Discount`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const updateDiscount = async (id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/Discount/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const deleteDiscount = async (id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/Discount/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export { 
    fetchDiscounts, 
    fetchDiscountDetails, 
    createDiscount, 
    updateDiscount, 
    deleteDiscount 
};