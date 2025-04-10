import { Button, } from "@heroui/react"
import { PlusIcon } from "lucide-react"
import HeroUIModal from "~/Components/Modal"
import { useState, useRef } from 'react';
import DeparmentModal from "./DepartmentModal";
import useStationStore from "~/Hooks/Setup/Station/Station/useStationStore";

const TanksDepartmentTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { saveDepartments, onDepartmentOnView } = useStationStore();

  const handleViewing = (type = null, id = null) => {
    if (type === "edit") {
      setIsOpen(true);
      onDepartmentOnView(true, id);
      return
    }
  }

  return (
    <div className="col-span-2 px-7">
      <div className="flex flex-row justify-between  items-center">
        <span className="text-md font-semibold text-default-400">Departments</span>
        <Button
          className="font-semibold"
          color="primary"
          onPress={() => {
            setIsOpen(true)
            onDepartmentOnView(false, null);
          }}
          radius="sm">
          <PlusIcon size={15} />
          Add New
        </Button>
      </div>

      <div className="border border-default-200 mt-4 w-full">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="text-sm font-semibold text-default-600 h-[40px] border border-b-default-200">
              <th>Tank Name</th>
              <th>Product</th>
            </tr>
          </thead>
          <tbody>
            {
              saveDepartments.length > 0 && saveDepartments.map((dep, index) => {
                return (
                  <tr key={index} className="text-sm border border-b-default-200 font-semibold text-default-600 h-[40px]">
                    <td align="center">{dep.name}</td>
                    <td align="center">
                      <Button
                        onPress={() => handleViewing('edit', dep.id)}
                        radius="none"
                        color="default"
                        className="bg-primary-200 text-primary font-bold m-1"
                      >
                        Edit
                      </Button>

                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>

      <DeparmentModal
        onOpenChange={() => {
          setIsOpen(false)
          onDepartmentOnView(false, null);
        }}
        isOpen={isOpen} />

    </div>
  )
}

export default TanksDepartmentTable
