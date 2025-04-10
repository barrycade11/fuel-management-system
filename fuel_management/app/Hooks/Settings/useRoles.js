import { apiClient } from "~/Constants/ApiClient";
import { useMutation, useQuery } from "@tanstack/react-query";

const useRoles = () => {
  return useQuery({
    queryKey: ['roles'],
    queryFn: async () => {
      const response = await apiClient.get('/Settings/roles');
      return response.data;
    }
  });
} 

export default useRoles;
