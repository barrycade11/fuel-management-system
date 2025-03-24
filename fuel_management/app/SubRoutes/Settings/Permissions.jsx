import { Button, SelectItem, Input } from "@heroui/react";
import SelectComponent from "./Components/SelectComponent";
import { MailIcon, SearchIcon, SettingsIcon } from "lucide-react";

const RoleCheckItem = ({
  action = "",
}) => {
  return (
    <div className="flex flex-row items-center">
      <input type="checkbox" className="mr-2" />
      <span className="text-sm text-black font-normal ">{action}</span>
    </div>
  )
}

const Permissions = () => {
  const menuItems = [
    {
      id: 0,
      name: 'Global Fuel Master',
    },
    {
      id: 1,
      name: 'Global Departments',
    },
    {
      id: 2,
      name: 'Global Shifts',
    },
    {
      id: 3,
      name: 'Global Payment Modes',
    },
  ]

  return (
    <section className="flex flex-col px-4">

      <SelectComponent
        label="User Role"
      >
        {['Admin', 'User'].map((name, index) => (
          <SelectItem key={index}>{name}</SelectItem>
        ))}
      </SelectComponent>

      <div className="grid grid-cols-1 md:grid-cols-3 pt-5 items-center">

        <div className="col-span-2 flex flex-wrap flex-row items-center gap-2">
          <RoleCheckItem action="View" />
          <RoleCheckItem action="Add" />
          <RoleCheckItem action="Edit" />
          <RoleCheckItem action="Delete" />

          <Button
            radius="none"
            className="ml-2 rounded-md opacity-80 bg-primary text-white font-semibold"
          >
            Apply to Selected Menus
          </Button>
        </div>

        <div className="justify-end flex flex-row items-center pt-5 md:p-0">
          <Input
            radius="none"
            endContent={
              <div className="flex gap-2">
                <SearchIcon className="rounded-sm text-2xl text-default-400 pointer-events-none flex-shrink-0" size={18} />
                <SettingsIcon size={18} />

              </div>
            }
            labelPlacement="outside"
            placeholder="Search Module"
          />
          <Button
            radius="none"
            className="rounded-md bg-primary opacity-80 ml-2 text-white font-semibold"
          >
            Add New
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="mt-4 bg-white rounded-md shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-white">
              <th className="w-12 py-3 px-4 text-left">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600"
                  checked={
                    menuItems.length > 0
                  }
                />
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-800">
                <div className="flex items-center">
                  Menu Item
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 11l5-5m0 0l5 5m-5-5v12"
                    ></path>
                  </svg>
                </div>
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-800">
                Permissions
              </th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((item, index) => (
              <tr
                key={item.id}
                className={index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}
              >
                <td className="py-3 px-4">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600"
                  />
                </td>
                <td className="py-3 px-4 text-gray-800">{item.name}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 mr-2 text-blue-600"
                        checked
                      />
                      <span>View</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 mr-2 text-blue-600"
                        checked
                      />
                      <span>Add</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 mr-2 text-blue-600"
                      />
                      <span>Edit</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 mr-2 text-blue-600"
                      />
                      <span>Delete</span>
                    </label>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="absolute bottom-[3%] right-[3%] flex flex-row gap-2">
        <Button
          radius="none"
          color="danger"
          className="rounded-sm"
        >
          <span className="font-semibold">Delete</span>
        </Button>
        <Button
          radius="none"
          color="primary"
          className="rounded-sm"
        >
          <span className="font-semibold">Save</span>
        </Button>

      </div>

    </section>
  )
}

export default Permissions;

