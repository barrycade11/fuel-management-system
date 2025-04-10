import { useMutation } from "@tanstack/react-query";
import { apiClient } from "~/Constants/ApiClient";

const usePermissionsMutation = () => {
  return useMutation({
    mutationFn: async (params) => {
      return apiClient.get(`/Settings/Permissions/${params}`);
    },
    onSuccess: (_) => {},
  });
}

export default usePermissionsMutation; 
