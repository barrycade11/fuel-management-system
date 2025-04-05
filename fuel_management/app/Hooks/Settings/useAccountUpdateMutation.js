import { apiClient } from "~/Constants/ApiClient";
import { useMutation } from "@tanstack/react-query";

const useAccountUpdateMutation = () => {
  return useMutation({
     mutationFn: async (params) => {
      return apiClient.put("/Settings/Users/update", params);
    },
    onSuccess: (_) => {},

  })

}

export default useAccountUpdateMutation;

