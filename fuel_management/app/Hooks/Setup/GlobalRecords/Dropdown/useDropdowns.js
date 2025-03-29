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

const fetchDropdownTypeList = async (typeId, id) => {
    try {
        const response = await apiClient.get(`${endPoints.GlobalRecords}/Dropdowns/${typeId}/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export {
    fetchDropdowns,
    fetchDropdownTypeList
};