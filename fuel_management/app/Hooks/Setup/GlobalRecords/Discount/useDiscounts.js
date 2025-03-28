import apiClient from "~/Constants/ApiClient";

const fetchDiscounts = async () => {
    try {
        const response = await apiClient.get(`/Setup/GlobalRecords/Discounts`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const fetchDiscountDetails = async (id) => {
    try {
        const response = await apiClient.get(`/Setup/GlobalRecords/Discounts/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const createDiscount = async (data) => {
    try {
        const response = await apiClient.post(`/Setup/GlobalRecords/Discount`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const updateDiscount = async (id, data) => {
    try {
        const response = await apiClient.put(`/Setup/GlobalRecords/Discount/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const deleteDiscount = async (id) => {
    try {
        const response = await apiClient.delete(`/Setup/GlobalRecords/Discount/${id}`);

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