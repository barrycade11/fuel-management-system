import {apiClient} from "~/Constants/ApiClient";

const useGetPMTDR = async (startDate, endDate, locations) => {
    try {
        const response = await apiClient.get(
            `/Dashboard/PMTDR`, 
            {
                params: {
                    startDate,
                    endDate,
                    locations
                }
            }
        );
        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export default useGetPMTDR