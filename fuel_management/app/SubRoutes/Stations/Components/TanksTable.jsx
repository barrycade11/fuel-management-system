import { Button, Chip } from "@heroui/react";
import { PlusIcon } from "lucide-react";
import TankFormModal from "./TankFormModal";
import { useState } from "react";
import useStationStore from "~/Hooks/Setup/Station/Station/useStationStore";

const TanksTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { tanks, onSetViewTank } = useStationStore();

  const handleOpenTankForm = () => {
    onSetViewTank(null);
    setIsOpen(true)
  }

  return (
    <>
      <div className="col-span-3 flex flex-col">
        <div
          className="flex flex-row justify-between items-center">
          <span className="text-md font-semibold text-default-600">Tanks</span>
          <Button
            onPress={handleOpenTankForm}
            className="font-semibold"
            color="primary"
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
                <th>Capacity</th>
                <th>Safe Capacity</th>
                <th>Status</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {
                tanks.length > 0 && tanks.map((tank, index) => {
                  return (
                    <tr key={index} className="border border-b-default-200 text-sm font-semibold text-default-600 h-[40px]">
                      <td align="center">{tank.tankName}</td>
                      <td align="center">
                        <Chip radius="sm" style={{ background: tank.productColor }} >{tank.productCode}</Chip>
                      </td>
                      <td align="center">{tank.capacity}</td>
                      <td align="center">{tank.safeCapacity}</td>
                      <td align="center">{true ? "Active" : "Inactive"}</td>
                      <td align="center">
                        <Button
                          onPress={() => {
                            onSetViewTank(tank);
                            setIsOpen(true);
                          }}
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
      </div>

      <TankFormModal
        isOpen={isOpen}
        onOpenChange={() => {
          onSetViewTank(null);
          setIsOpen(false)
        }}
      />
    </>
  );
}

export default TanksTable;
