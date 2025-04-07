import StationFormDetails from "./Components/StationFormDetails";
import { Button } from '@heroui/react';
import { PlusIcon } from 'lucide-react'


const InitialPage = () => {
  return (
    <div className="flex flex-col px-4">

      <StationFormDetails />

      <div className="grid md:grid-cols-5 mt-14 ">
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
                <tr className="text-sm font-semibold text-default-600 h-[40px]">
                  <td align="center">testing</td>
                  <td align="center">testing</td>
                  <td align="center">testing</td>
                  <td align="center">testing</td>
                  <td align="center">testing</td>
                  <td align="center">testing</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

        <div className="col-span-2 px-7">
          <div className="flex flex-row justify-between  items-center">
            <span className="text-md font-semibold text-default-600">Departments</span>
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
                </tr>
              </thead>
              <tbody>
                <tr className="text-sm font-semibold text-default-600 h-[40px]">
                  <td align="center">testing</td>
                  <td align="center">testing</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

      </div>

    </div>
  )
}

export default InitialPage;
