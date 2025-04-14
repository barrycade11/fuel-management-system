
import { Outlet, NavLink, useLocation, useParams } from "react-router";
import Navbar from "~/Components/Navbar";
import StringRoutes from "~/Constants/StringRoutes";
import useLocationStoreState from "~/Hooks/Locations/useLocationStoreState";
import { useFetchStationId } from "~/Hooks/Setup/Station/Station/useStations";

const StationDetails = () => {
  const { id } = useParams();
  const { pathname, state } = useLocation()
  const stringRoutes = new StringRoutes();
  const { data } = useFetchStationId(id);

  return (
    <div className="flex flex-col bg-white h-full">

      <Navbar title={id !== undefined ? data?.body[0]?.name : "Add Station"}>
        <div className="pt-6">
          <div className="flex space-x-4 flex-row items-center justify-start border-b-1 mx-1">
            <NavLink
              to={null} // Ensure this points to the "settings" route
              end // This makes sure it's active only for the exact "settings" route
              className={({ isActive }) =>
                stringRoutes.getCurrentSubRoute(pathname).includes(StringRoutes.settings) && stringRoutes.getRootRoute(pathname).includes(StringRoutes.settings)
                  ? "border-b-2 pb-3 border-primary font-semibold text-primary"
                  : "text-gray-500 pb-3"
              }
            >
              Stations 
            </NavLink>
            <NavLink
              to={StringRoutes.shifts} // Points to "settings/permissions"
              className={({ isActive }) =>
                stringRoutes.getCurrentSubRoute(pathname).includes(StringRoutes.shifts)
                  ? "border-b-2 pb-3 border-primary font-semibold text-primary"
                  : "text-gray-500 pb-3"
              }
            >
              Shifts
            </NavLink>
          </div>
        </div>
      </Navbar>

      <Outlet />
    </div>
  )
}

export default StationDetails;
