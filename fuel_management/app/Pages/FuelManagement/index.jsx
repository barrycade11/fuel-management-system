import { use,useEffect } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import Navbar from "~/Components/Navbar"
import StringRoutes from "~/Constants/StringRoutes";


const FuelManagement = () => {
  const { pathname } = useLocation(); 

  useEffect(() => {
    localStorage.removeItem('fuel-delivery.station') 
    localStorage.removeItem('fuel-delivery.effectivedate') 
  }, []);

  return (
    <>
      <Navbar
          title="Fuel Management"
        /> 

      <div className="p-6">
        <div className="flex space-x-4 mb-4">
          <NavLink
            to={`/${StringRoutes.fuelManagement}`}
            className={({ isActive }) =>
              `${pathname === `/${StringRoutes.fuelManagement}` ? "border-b-2 border-blue-500 font-semibold" : "text-gray-500"}`
            }
          >
            Fuel Master
          </NavLink>
          <NavLink
            to={`/${StringRoutes.fuelPrice}`}
            className={({ isActive }) =>
              `${isActive ? "border-b-2 border-blue-500 font-semibold" : "text-gray-500"}`
            }
          >
            Fuel Price
          </NavLink>
          <NavLink
            to={`/${StringRoutes.fuelDeliveryList}`}
            className={({ isActive }) =>
              `${isActive ? "border-b-2 border-blue-500 font-semibold" : "text-gray-500"}`
            }
          >
            Fuel Delivery
          </NavLink>
          <NavLink
            to={`/${StringRoutes.lubricants}`}
            className={({ isActive }) =>
              `${isActive ? "border-b-2 border-blue-500 font-semibold" : "text-gray-500"}`
            }
          >
            Lubricants
          </NavLink>
        </div>

        <Outlet />
      </div>
    </>
  );
};

export default FuelManagement;
