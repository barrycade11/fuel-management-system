import { apiClient } from "~/Constants/ApiClient";
import { useQuery } from "@tanstack/react-query";

const useGetProvinces = () => {
  return useQuery({
    queryKey: ['provinces'],
    queryFn: async () => {
      const response = await apiClient.get('/Locations/provinces');
      return response.data;
    }
  });
}

export default useGetProvinces; 


