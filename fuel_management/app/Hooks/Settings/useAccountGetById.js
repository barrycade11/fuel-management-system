import { apiClient } from "~/Constants/ApiClient";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";

const useAccountGetById = () => {
  const { id } = useParams()
  // console.log("Getting acc by ID", id)

  return useQuery({
    queryKey: ['accountid', id],
    queryFn: async () => {
      // query.invalidateQueries(["accountid"]); // Clear cache before fetching
      // query.invalidateQueries(["roles"]); // Clear cache before fetching
      // query.invalidateQueries(["stationidname"]); // Clear cache before fetching
      const response = await apiClient.get(`/Settings/Users/${id}`)

      return response.data
    },
    enabled: false, //prevent fetching when adding new user
  });
}

export default useAccountGetById;
