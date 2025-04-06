import { apiClient } from "~/Constants/ApiClient";
import { useMutation } from "@tanstack/react-query";

const useAccountDeleteMutation = () => {
  return useMutation({
    mutationFn: async (params) => {
      return apiClient.delete(`/Settings/Users/delete/${params}`);
    },
    onSuccess: (_) => { },

  })
}

export default useAccountDeleteMutation;
