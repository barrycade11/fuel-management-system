import {apiClient} from "~/Constants/ApiClient";

const useGetForecourtInput = async (effectivityDate, selectedStation, editId) => {
    try {
        const response = await apiClient.get(
            `/ForecourtSales/getDailySalesForecourtData`, 
            {
                params: {
                    effectivityDate,
                    selectedStation,
                    inputId: editId
                }
            }
        );
        return response.data;
    }
    catch (error) {
        throw error;
    }
};

export default useGetForecourtInput