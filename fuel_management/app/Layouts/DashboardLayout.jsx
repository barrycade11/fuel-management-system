
import Sidebar from "~/Components/Sidebar";
import Navbar from "~/Components/Navbar";
import { Outlet } from "react-router";
import useToggleDrawer from "~/Hooks/Sidenav/useToggleDrawer";
import useAuth from "~/Hooks/Auth/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

// Layout for the admin dashboard
const DashboardLayout = () => {
  const { isOpen } = useToggleDrawer();
  const { token } = useAuth();
  const navigate = useNavigate();

  // Redirect to home if token is present
  useEffect(() => {
    if (token === null) {
      navigate("/");
    }
  }, [token, navigate]); // Added useEffect for better navigation handling

  return (
    <div className={`group grid h-screen transition-all duration-300 ${isOpen ? "xl:grid-cols-[18%_auto]" : "xl:grid-cols-[50px_auto]"}`}>
      <Sidebar />
      <div className="flex-1 overflow-auto bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;

