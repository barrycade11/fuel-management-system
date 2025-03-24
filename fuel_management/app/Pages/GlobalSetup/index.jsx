import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import Navbar from "~/Components/Navbar"
import StringRoutes from "~/Constants/StringRoutes";

const GlobalRecords = () => {
  const { pathname } = useLocation(); 

  return (
    <>
      <Navbar
          title="Global Setup"
        /> 

      <div className="p-6">
        <div className="flex space-x-4 mb-4">
          <NavLink
            to={`/${StringRoutes.globalSetup}`}
            className={({ isActive }) =>
              `${pathname === `/${StringRoutes.globalSetup}` ? "border-b-2 border-blue-500 font-semibold" : "text-gray-500"}`
            }
          >
            Fuel Master
          </NavLink>
          <NavLink
            to={`/${StringRoutes.departments}`}
            className={({ isActive }) =>
              `${isActive ? "border-b-2 border-blue-500 font-semibold" : "text-gray-500"}`
            }
          >
            Departments
          </NavLink>
          <NavLink
            to={`/${StringRoutes.shifts}`}
            className={({ isActive }) =>
              `${isActive ? "border-b-2 border-blue-500 font-semibold" : "text-gray-500"}`
            }
          >
            Shifts
          </NavLink>
          <NavLink
            to={`/${StringRoutes.paymentModes}`}
            className={({ isActive }) =>
              `${isActive ? "border-b-2 border-blue-500 font-semibold" : "text-gray-500"}`
            }
          >
            Payment Modes
          </NavLink>
          <NavLink
            to={`/${StringRoutes.discounts}`}
            className={({ isActive }) =>
              `${isActive ? "border-b-2 border-blue-500 font-semibold" : "text-gray-500"}`
            }
          >
            Discounts
          </NavLink>
          <NavLink
            to={`/${StringRoutes.dropdownRecords}`}
            className={({ isActive }) =>
              `${isActive ? "border-b-2 border-blue-500 font-semibold" : "text-gray-500"}`
            }
          >
            Dropdown Records
          </NavLink>
          <NavLink
            to={`/${StringRoutes.employees}`}
            className={({ isActive }) =>
              `${isActive ? "border-b-2 border-blue-500 font-semibold" : "text-gray-500"}`
            }
          >
            Employees
          </NavLink>
          <NavLink
            to={`/${StringRoutes.customers}`}
            className={({ isActive }) =>
              `${isActive ? "border-b-2 border-blue-500 font-semibold" : "text-gray-500"}`
            }
          >
            Customers
          </NavLink>
          <NavLink
            to={`/${StringRoutes.targets}`}
            className={({ isActive }) =>
              `${isActive ? "border-b-2 border-blue-500 font-semibold" : "text-gray-500"}`
            }
          >
            Targets
          </NavLink>
          <NavLink
            to={`/${StringRoutes.incentives}`}
            className={({ isActive }) =>
              `${isActive ? "border-b-2 border-blue-500 font-semibold" : "text-gray-500"}`
            }
          >
            Incentives
          </NavLink>
        </div>

        <Outlet />
      </div>
    </>
  );
};

export default GlobalRecords;
