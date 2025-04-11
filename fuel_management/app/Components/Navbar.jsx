import { Menu } from 'lucide-react'
import useToggleDrawer from '~/Hooks/Sidenav/useToggleDrawer';

const Navbar = ({
  title = "",
  children
}) => {
  const { isToggled, screenSizes, onManageSidebarOpen } = useToggleDrawer();

  return (
    <nav className="w-full shadow-2xs bg-white pl-3 pt-5">
      <div className="flex flex-row">
        <Menu className='cursor-pointer' onClick={() => screenSizes !== "desktop" ? onManageSidebarOpen() : isToggled()} />
        <h2 className="font-light pl-2">{title}</h2>
      </div>
      {children}
    </nav>

  )
}

export default Navbar;
