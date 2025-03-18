import { Menu } from 'lucide-react'
import useToggleDrawer from '~/Hooks/Sidenav/useToggleDrawer';

const Navbar = ({
  title = "", 
}) => {
  const { isToggled } = useToggleDrawer(); 

  return (
    <nav className="w-full shadow-2xs bg-white pl-3 py-5">
      <div className="flex flex-row">
        <Menu className='cursor-pointer' onClick={isToggled} />
        <h2 className="font-light pl-2">{title}</h2>
      </div>
    </nav>

  )
}

export default Navbar;
