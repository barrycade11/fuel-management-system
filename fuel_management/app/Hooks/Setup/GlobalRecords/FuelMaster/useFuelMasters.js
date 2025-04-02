import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

const fetchFuelMasters = async () => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/FuelMasters`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const fetchFuelMasterDetails = async (id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/FuelMaster/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const createFuelMaster = async (data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/FuelMaster`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const updateFuelMaster = async (id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/FuelMaster/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const deleteFuelMaster = async (id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/FuelMaster/${id}`);

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