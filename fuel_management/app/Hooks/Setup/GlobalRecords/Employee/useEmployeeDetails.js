import apiClient from "~/Constants/ApiClient";

export const fetchEmplolyeeDetails = async (id) => {
    try {
        const response = await apiClient.get(`/Employees/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};