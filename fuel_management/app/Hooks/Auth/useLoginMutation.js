import { apiClient } from "~/Constants/ApiClient";
import { useMutation } from "@tanstack/react-query";

const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (params) => {
      return apiClient.post("/Authentication/login", params);
    },
    onSuccess: (_) => {},
  });
};

export default useLoginMutation;
