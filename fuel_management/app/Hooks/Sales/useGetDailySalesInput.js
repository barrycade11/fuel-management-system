import {apiClient} from "~/Constants/ApiClient";

const useGetDailySalesInput = async (effectivityDate, selectedStation) => {
    try {
        const response = await apiClient.get(
            `/Sales/getDailySalesInput`, 
            {
                params: {
                    effectivityDate,
                    selectedStation
                }
            }
        );
        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export default useGetDailySalesInput