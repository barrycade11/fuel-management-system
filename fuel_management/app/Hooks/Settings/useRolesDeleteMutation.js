import { apiClient } from "~/Constants/ApiClient";
import { useMutation } from "@tanstack/react-query";

const useRolesDeleteMutation = () => {
  return useMutation({
    mutationFn: async (params) => {
      return apiClient.delete(`/Settings/roles/${params}`);
    },
    onSuccess: (_) => { },
  })

}

export default useRolesDeleteMutation
