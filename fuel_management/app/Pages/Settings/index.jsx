import { NavLink, Outlet, useLocation } from "react-router";
import Navbar from "~/Components/Navbar";
import StringRoutes from "~/Constants/StringRoutes";

const Settings = () => {
  const { pathname } = useLocation(); 
  const stringRoutes = new StringRoutes();

  return (

    <>
      <Navbar title="Settings">
        <div className="py-6">
          <div className="flex space-x-4 flex-row items-center justify-start border-b-2 mx-1">
            <NavLink
              to={null} // Ensure this points to the "settings" route
              end // This makes sure it's active only for the exact "settings" route
              className={({ isActive }) =>
                stringRoutes.getCurrentSubRoute(pathname).includes(StringRoutes.settings)
                  ? "border-b-2 pb-3 border-blue-500 font-semibold"
                  : "text-gray-500 pb-3"
              }
            >
              Users
            </NavLink>
            <NavLink
              to={StringRoutes.permission} // Points to "settings/permissions"
              className={({ isActive }) =>
                stringRoutes.getCurrentSubRoute(pathname).includes(StringRoutes.permission)
                  ? "border-b-2 pb-3 border-blue-500 font-semibold"
                  : "text-gray-500 pb-3"
              }
            >
              Permissions
            </NavLink>
          </div>
        </div>
      </Navbar>
      <Outlet />
    </>
  );
};

export default Settings;
