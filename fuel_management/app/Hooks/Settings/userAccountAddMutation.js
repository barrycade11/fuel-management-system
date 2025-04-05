
import { apiClient } from "~/Constants/ApiClient";
import { useMutation } from "@tanstack/react-query";

const useAccountAddMutation = () => {
  return useMutation({
    mutationFn: async (params) => {
      return apiClient.post("/Settings/Users/create", params);
    },
    onSuccess: (_) => { },
  })
}

export default useAccountAddMutation;
