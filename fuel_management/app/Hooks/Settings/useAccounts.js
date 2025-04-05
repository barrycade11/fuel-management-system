import { apiClient } from "~/Constants/ApiClient";
import { useMutation } from "@tanstack/react-query";

const useAccountMutation = () => {
  return useMutation({
     mutationFn: async (params) => {
      const request = { stations: [...params] }
      return apiClient.post("/Settings/Users", request);
    },
    onSuccess: (_) => {},

  })

}

export default useAccountMutation;

