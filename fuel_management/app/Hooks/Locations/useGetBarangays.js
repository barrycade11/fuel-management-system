import { apiClient } from "~/Constants/ApiClient";
import { useMutation} from "@tanstack/react-query";

const useGetBarangays = () => {
  return useMutation({
    mutationFn: async (params) => {
      const response = await apiClient.post('/Locations/barangays', params);
      return response.data;
    },
    onSuccess: (_) => {},
  });
}

export default useGetBarangays; 


