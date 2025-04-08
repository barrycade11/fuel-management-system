import { Button, Chip } from "@heroui/react";
import { PlusIcon } from "lucide-react";


const tanks = [
  {
    tankName: 1,
    product: "VPR",
    capacity: 21600,
    safeCapacity: "20,0000",
    status: true,
  },
  {
    tankName: 2,
    product: "VPG",
    capacity: 21600,
    safeCapacity: "20,0000",
    status: true,
  },
  {
    tankName: 2,
    product: "VPG",
    capacity: 21600,
    safeCapacity: "20,0000",
    status: true,
  },
];

const TanksTable = () => {
  return (
    <div className="col-span-3 flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <span className="text-md font-semibold text-default-600">Tanks</span>
        <Button
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
              tanks.map((tank, index) => {
                return (
                  <tr key={index} className="border border-b-default-200 text-sm font-semibold text-default-600 h-[40px]">
                    <td align="center">{tank.tankName}</td>
                    <td align="center">
                      <Chip radius="sm" color="primary" >{tank.product}</Chip>
                    </td>
                    <td align="center">{tank.capacity}</td>
                    <td align="center">{tank.safeCapacity}</td>
                    <td align="center">{tank.status ? "Active" : "Inactive"}</td>
                    <td align="center">
                      <Button 
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


  );
}

export default TanksTable;
