import PrimaryButton from "~/Components/PrimayButton"
import { CircularProgress } from "@heroui/react"
import { useFetchStations  } from "~/Hooks/Setup/Station/Station/useStations";
import TableSkeleton from "~/Components/TableSkeleton";
import { useNavigate } from "react-router";
import StringRoutes from "~/Constants/StringRoutes";


const TableRow = ({ children }) => {
  return (
    <tr className="h-[50px] border border-b-default-300">
      {children}
    </tr>
  )
}

const StationTable = () => {
  const { isLoading, isError, error, data } = useFetchStations();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="p-4">
        <TableSkeleton />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="mx-4 p-4 border border-default-300 bg-danger-50">
        <span className="text-sm font-semibold text-default-600">
          {error.message}
        </span>
      </div>
    )
  }

  const combineLocationDetails = (item) => {
    return `${item.address} ${item.barangay} ${item.city} ${item.province}`;
  }

  const handleView = (id) => {
    navigate(StringRoutes.stationDetail + `/${id}`);
  } 

  return (
    <div className="px-4 overflow-x-auto">
      <table className="w-full border border-default-200 rounded-sm">
        <thead>
          <TableRow>
            <th className="text-sm font-semibold text-default-800">Station Code</th>
            <th className="text-sm font-semibold text-default-800">Station Name</th>
            <th className="text-sm font-semibold text-default-800">Location</th>
            <th className="text-sm font-semibold text-default-800">Action</th>
          </TableRow>
        </thead>
        <tbody>
          {
            data && Array.isArray(data.body) && data.body.map((item, index) => (
              < TableRow key={index} >
                <td align="center" className="whitespace-nowrap">{item.code}</td>
                <td align="center" className="whitespace-nowrap">{item.name}</td>
                <td align="center" className="whitespace-nowrap">{combineLocationDetails(item)}</td>
                <td align="center">
                  <PrimaryButton
                    onClick={() => handleView(item.id)}
                    fullWidth={false}
                    variant="ghost"
                    color="primary"
                    title="View" />
                </td>
              </TableRow>

            ))
          }
        </tbody>
      </table>
    </div >

  )
}


export default StationTable;
