import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";
import { useQuery, } from "@tanstack/react-query";

// Hook to generate customer code
const useGenerateCustomerCode = (resource) => {
    return useQuery({
        queryKey: [resource],
        queryFn: async () => {
            const response = await apiClient.get(`${endPoints.GlobalRecords}/${resource}/generate-cus-code`);
            return response.data;
        },
    });
};

export { 
    useGenerateCustomerCode, 
};