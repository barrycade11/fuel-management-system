import {apiClient} from "~/Constants/ApiClient";

export const useUploadDailySalesInputSelect = async (data) => {
    try {
        const response = await apiClient.post(
            `/SelectSales/dailySalesInputSelect`,
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