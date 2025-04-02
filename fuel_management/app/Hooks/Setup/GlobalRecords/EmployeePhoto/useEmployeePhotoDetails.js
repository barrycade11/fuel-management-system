import apiClient from "~/Constants/ApiClient";

export const fetchEmployeePhotoDetails = async (id) => {
    try {
        const response = await apiClient.get(`/EmployeePhotos/${id}`);

        return response.data;
    }
    catch (error) {
        throw error;
    }
};