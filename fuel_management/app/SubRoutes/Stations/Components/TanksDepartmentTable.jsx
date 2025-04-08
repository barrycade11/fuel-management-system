import { Button } from "@heroui/react"
import { PlusIcon } from "lucide-react"

const deparments = [
  {
    id: 1,
    name: "Forecourt",
  },
  {
    id: 1,
    name: "Shop",
  },
  {
    id: 1,
    name: "SHOC",
  },
]

const TanksDepartmentTable = () => {
  return (
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
            {
              deparments.map((dep, index) => {
                return (
                  <tr key={index} className="text-sm border border-b-default-200 font-semibold text-default-600 h-[40px]">
                    <td align="center">{dep.name}</td>
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

  )

}

export default TanksDepartmentTable
