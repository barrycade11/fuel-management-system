import apiClient from "~/Constants/ApiClient";

const fetchFuelMasters = async () => {
    try {
        const response = await apiClient.get(`/Setup/GlobalRecords/FuelMasters`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const fetchFuelMasterDetails = async (id) => {
    try {
        const response = await apiClient.get(`/Setup/GlobalRecords/FuelMaster/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const createFuelMaster = async (data) => {
    try {
        const response = await apiClient.post(`/Setup/GlobalRecords/FuelMaster`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const updateFuelMaster = async (id, data) => {
    try {
        const response = await apiClient.put(`/Setup/GlobalRecords/FuelMaster/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const deleteFuelMaster = async (id) => {
    try {
        const response = await apiClient.delete(`/Setup/GlobalRecords/FuelMaster/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export { 
    fetchFuelMasters, 
    fetchFuelMasterDetails, 
    createFuelMaster, 
    updateFuelMaster, 
    deleteFuelMaster 
};