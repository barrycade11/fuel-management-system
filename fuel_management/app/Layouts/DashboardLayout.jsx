import Sidebar from "~/Components/Sidebar";
import Navbar from "~/Components/Navbar";
import { Outlet } from "react-router";
import useToggleDrawer from '~/Hooks/Sidenav/useToggleDrawer'
import { useEffect, useState } from "react";

// Screen size breakpoints
const BREAKPOINTS = {
  MOBILE: 480,   // Small mobile devices
  TABLET: 1024   // Tablets and smaller laptops
};

//layout for the whole admin dashboard
const DashboardLayout = () => {
  const { isOpen, onManageScreenSize } = useToggleDrawer();
  const [screenSize, setScreenSize] = useState('desktop');
  const [drawerSize, setDrawerSize] = useState("md");
  // Check screen size and set appropriate view mode
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width <= BREAKPOINTS.MOBILE) {
        setScreenSize('mobile');
        setDrawerSize("xs");
        onManageScreenSize('mobile');
      } else if (width <= BREAKPOINTS.TABLET) {
        setScreenSize('tablet');
        setDrawerSize("sm");
        onManageScreenSize('tablet');
      } else {
        setScreenSize('desktop');
        onManageScreenSize('desktop');
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, [screenSize]);

  return (
    <div className={`group grid h-screen transition-all duration-300 grid-cols[100%] ${isOpen ? 'xl:grid-cols-[18%_auto]' : 'xl:grid-cols-[50px_auto]'}`}>
      <Sidebar screenSize={screenSize} drawerSize={drawerSize} />
      <div className="flex-1 overflow-auto bg-gray-100">
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout;
