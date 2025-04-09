import { apiClient } from "~/Constants/ApiClient";
import { useMutation} from "@tanstack/react-query";

const useGetCitiesMunicipalities = () => {
  return useMutation({
    mutationFn: async (params) => {
      const response = await apiClient.post('/Locations/city-municipality', params);
      return response.data;
    },
    onSuccess: (_) => {},
  });
}

export default useGetCitiesMunicipalities; 


