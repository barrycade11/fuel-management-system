import apiClient from "~/Constants/ApiClient";

export const fetchEmployeePhotos = async () => {
    try {
        const response = await apiClient.get(`/EmployeePhotos`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};