import apiClient from "~/Constants/ApiClient";

export const useUploadDailySales = async (data) => {
    try {
        const response = await apiClient.post(
            `/Sales/POS-Upload`,
            data,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        return response.data;
    }
    catch (error) {
        throw error;
    }
};