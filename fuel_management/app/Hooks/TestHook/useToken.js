import { useQuery } from "@tanstack/react-query";
import { apiClient } from "~/Constants/ApiClient";

/**
 * No purpose just a sample code to implement fetch 
 *
 */
const useToken = () => {
  return useQuery({
    queryKey: ['testingToken'],
    queryFn: async () => {
      const response = await apiClient.get("/testing/token");
      return response.data;
    }
  })
};

export default useToken;
