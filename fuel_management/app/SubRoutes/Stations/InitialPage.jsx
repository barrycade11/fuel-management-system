import StationFormDetails from "./Components/StationFormDetails";
import { Button } from '@heroui/react';
import { PlusIcon } from 'lucide-react'
import TanksTable from "./Components/TanksTable";
import TanksDepartmentTable from "./Components/TanksDepartmentTable";

const InitialPage = () => {
  return (
    <div className="flex flex-col px-4">
      <StationFormDetails />
      <div className="grid md:grid-cols-5 mt-14 ">
        <TanksTable />
        <TanksDepartmentTable/>
      </div>
    </div>
  )
}

export default InitialPage;
