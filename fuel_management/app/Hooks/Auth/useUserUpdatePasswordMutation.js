import { apiClient } from "~/Constants/ApiClient";
import { useMutation } from "@tanstack/react-query";

const useUserUpdatePasswordMutation = () => {
  return useMutation({
    mutationFn: async (params) => {
      return apiClient.post("/Authentication/change-password", params);
    },
    onSuccess: (_) => {},  })
}

export default useUserUpdatePasswordMutation;
