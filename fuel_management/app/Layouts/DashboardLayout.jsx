import Sidebar from "~/Components/Sidebar";
import Navbar from "~/Components/Navbar";
import { Outlet } from "react-router";
import useToggleDrawer from '~/Hooks/Sidenav/useToggleDrawer'

//layout for the whole admin dashboard
const DashboardLayout = () => {
  const { isOpen } = useToggleDrawer();

  return (
    <div className={`group grid h-screen transition-all duration-300 grid-cols[100%] ${isOpen ? 'xl:grid-cols-[18%_auto]' : 'xl:grid-cols-[50px_auto]'}`}>
      <Sidebar />
      <div className="flex-1 overflow-auto bg-gray-100">
        <Outlet/>
      </div>
    </div>
  )
}

export default DashboardLayout;
