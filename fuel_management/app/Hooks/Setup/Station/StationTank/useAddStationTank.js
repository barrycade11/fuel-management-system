import { apiClient } from "~/Constants/ApiClient";
import { endPoints } from "~/Constants/EndPoints";
import { useMutation } from "@tanstack/react-query";

const useAddStationTankMutation = () => {
  return useMutation({
    mutationFn: async ({ params, id }) => {
      console.log(params);
      const response = await apiClient.post(`${endPoints.Stations}/Station/${id}/Tank`, params);
      return response.data;
    },
    onSuccess: (_) => { },
  })
}

export default useAddStationTankMutation;

