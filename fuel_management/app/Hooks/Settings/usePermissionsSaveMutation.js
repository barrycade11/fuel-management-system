import { apiClient } from "~/Constants/ApiClient";
import { useMutation } from "@tanstack/react-query";

const usePermissionsSaveMutation = () => {
  return useMutation({
    mutationFn: async (params) => {
      return apiClient.put(`/Settings/Permissions/save`, params);
    },
    onSuccess: (_) => { },
  })
}

export default usePermissionsSaveMutation;
