import {apiClient} from "~/Constants/ApiClient";

export const useUploadDailySalesXml = async (data) => {
    try {
        const response = await apiClient.post(
            `/Sales/posUpload`,
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