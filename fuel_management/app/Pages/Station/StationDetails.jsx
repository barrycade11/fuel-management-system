
import { Outlet, NavLink, useLocation } from "react-router";
import Navbar from "~/Components/Navbar";
import StringRoutes from "~/Constants/StringRoutes";

const StationDetails = () => {
  const { pathname } = useLocation()
  const stringRoutes = new StringRoutes();

  return (
    <div className="flex flex-col bg-white h-full">

      <Navbar title="SH Nuvali">
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
              to={'permissions'} // Points to "settings/permissions"
              className={({ isActive }) =>
                stringRoutes.getCurrentSubRoute(pathname).includes(StringRoutes.permission)
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
