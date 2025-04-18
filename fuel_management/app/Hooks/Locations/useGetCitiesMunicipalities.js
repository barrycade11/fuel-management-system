import { apiClient } from "~/Constants/ApiClient";
import { useMutation} from "@tanstack/react-query";

const useGetCitiesMunicipalities = () => {
  console.log("useGetCitiesMunicipalities")
  return useMutation({
    mutationFn: async (params) => {
      const response = await apiClient.post('/Locations/city-municipality', params);
      
      console.log(response.data, "API CITY")
      return response.data;
    },
    onSuccess: (_) => {},
  });
};

export default useGetCitiesMunicipalities; 


