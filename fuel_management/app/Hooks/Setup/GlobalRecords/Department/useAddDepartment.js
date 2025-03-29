import apiClient from "~/Constants/ApiClient";

export const createDepartment = async (data) => {
    try {
        const response = await apiClient.post(`/Department`, data);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};