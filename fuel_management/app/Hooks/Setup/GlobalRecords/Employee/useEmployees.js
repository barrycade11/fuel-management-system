import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";
import { useQuery } from "@tanstack/react-query";

// Hook to generate employee code
const useGenerateEmployeeCode = (resource) => {
    return useQuery({
        queryKey: [resource],
        queryFn: async () => {
            const response = await apiClient.get(`${endPoints.GlobalRecords}/${resource}/generate-emp-code`);
            return response.data;
        },
    });
};

export { 
    useGenerateEmployeeCode, 
};