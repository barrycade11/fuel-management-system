import { useMutation } from "@tanstack/react-query";
import { apiClient } from "~/Constants/ApiClient";

const useAddRoleMutation = () => {
  return useMutation({
    mutationFn: async (params) => {
      return apiClient.post("/Settings/Permissions/generate", params);
    },
    onSuccess: (_) => {},
  });
  
}

export default useAddRoleMutation;
