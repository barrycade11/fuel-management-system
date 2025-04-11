import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";

const fetchDropdowns = async (typeId) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Dropdowns/${typeId}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const fetchDropdownsSetup = async (typeId) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Dropdowns/${typeId}/Setup`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const fetchDropdownTypeList = async (typeId, id) => {
    if (!typeId || !id) {
        console.error("Invalid parameters:", { typeId, id });
        return;
    }
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Dropdowns/${typeId}/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const fetchCustomDropdownTypeList = (customOptions, valueArray) => {
    if (!customOptions || customOptions.length === 0) {
        return [];
    }
    
    return customOptions.filter(option => valueArray.includes(option.id.toString()));
};

const createDropdown = async (typeId, data) => {
    try {
        const response = await apiClient.post(`${endPoints.GlobalRecords}/Dropdown/${typeId}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const updateDropdown = async (typeId, id, data) => {
    try {
        const response = await apiClient.put(`${endPoints.GlobalRecords}/Dropdown/${typeId}/${id}`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

const deleteDropdown = async (typeId, id) => {
    try {
        const response = await apiClient.delete(`${endPoints.GlobalRecords}/Dropdown/${typeId}/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export {
    fetchDropdowns,
    fetchDropdownTypeList,
    fetchCustomDropdownTypeList,
    createDropdown,
    updateDropdown,
    deleteDropdown,
};