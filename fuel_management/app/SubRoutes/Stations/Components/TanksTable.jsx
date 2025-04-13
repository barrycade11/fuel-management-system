import { Button, Chip } from "@heroui/react";
import { PlusIcon } from "lucide-react";
import TankFormModal from "./TankFormModal";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useStationStore from "~/Hooks/Setup/Station/Station/useStationStore";
import useStationTanks from "~/Hooks/Setup/Station/StationTank/useStationTanks";
import { useQueryClient } from "@tanstack/react-query";
import TableSkeleton from "~/Components/TableSkeleton";
import ErrorElement from "~/Components/ErrorElement";

const TanksTable = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const { tanks, onSetViewTank, onSetFetchTanks} = useStationStore();
  const [isViewing, setIsViewing] = useState(false);
  const { data, isLoading, isError, error, isSuccess, refetch } = useStationTanks(id);

  useEffect(() => {
    queryClient.invalidateQueries(['tanks', id]);
    if (id !== undefined) {
      refetch();
    }
  }, [])

  useEffect(() => {
    if(isSuccess) {
      let items = [];
      data?.map((item) => {
        items.push({
          id: item.id,
          tankName: item.name,
          productId: item.fuelmasterid,
          productName: item.fuelmaster,
          capacity: item.capacity,
          safeCapacity: item.capacitysafe,
          details: item.details,
          status: true,
        })
      })
      onSetFetchTanks(items);
    }

  }, [isSuccess, data])

  if (isLoading) {
    return <div className="col-span-3 flex flex-col"><TableSkeleton /></div>
  }

  if (isError) {
    return <ErrorElement>{error.message}</ErrorElement>
  }

  const handleOpenTankForm = () => {
    onSetViewTank(null);
    setIsOpen(true)
    setIsViewing(false);
  }

  return (
    <>
      <div className="col-span-3 flex flex-col">
        <div
          className="flex flex-row justify-between items-center">
          <span className="text-md font-semibold text-default-600">Tanks</span>
          <Button
            disabled={id === undefined || id === null}
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
                tanks && tanks.length > 0 && tanks.map((tank, index) => {
                  return (
                    <tr key={index} className="border border-b-default-200 text-sm font-semibold text-default-600 h-[40px]">
                      <td align="center">{tank.tankName}</td>
                      <td align="center">
                        <Chip radius="sm" style={{ background: tank.productColor }} >{tank.productName}</Chip>
                      </td>
                      <td align="center">{tank.capacity}</td>
                      <td align="center">{tank.safeCapacity}</td>
                      <td align="center">{true ? "Active" : "Inactive"}</td>
                      <td align="center">
                        <Button
                          onPress={() => {
                            onSetViewTank(tank);
                            setIsOpen(true);
                            setIsViewing(true);
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
          setIsOpen(false)
        }}
      />
    </>
  );
}

export default TanksTable;
