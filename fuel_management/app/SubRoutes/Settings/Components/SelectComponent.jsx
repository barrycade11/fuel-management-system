import { Select, SelectItem } from "@heroui/react";
import useRoles from "~/Hooks/Settings/useRoles";

const SelectComponent = ({
  label = "",
  children,
  onChange
}) => {
  const { data, isLoading, isError, isSuccess } = useRoles();

  if (isLoading) {
    return (
      <div className="flex flex-col w-[200px]">
        <span className="text-gray-500 text-small py-1 font-normal">{label}</span>
        <div className="bg-gray-200 p-2 rounded-md text-sm font-normal">
          Loading...
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-[200px]">
      <span className="text-gray-500 text-small py-1 font-normal">{label}</span>
      <Select
        onChange={onChange}

        aria-label="none" radius="none" className="max-w-xs rounded-none" placeholder="Select role">
        {data.body.map((dt, index) => (
          <SelectItem aria-label="none" key={dt.id} value={dt.id}>{dt.name}</SelectItem>
        ))}
      </Select>
    </div>
  )
}

const SelectOptionRole = ({
  onChange,
  name = "",
  defaultSelectedKeys = [],
}) => {
  const { data, isLoading, isError, isSuccess } = useRoles();
  if (isLoading) {
    return (
      <div className="flex flex-col w-full">
        <span className="text-default-500 text-small py-1 font-normal">User Roles</span>
        <div className="bg-gray-200 p-2 rounded-md text-sm font-normal">
          Loading...
        </div>
      </div>
    )
  }

  return (
    <Select
      name={name}
      aria-labelledby="none"
      radius="none"
      placeholder="Select Role"
      onSelectionChange={(e) => onChange(e)}
      selectedKeys={defaultSelectedKeys}
      fullWidth className="flex-1">
      {data.body.map((data) => (
        <SelectItem
          aria-label={data.name} key={data.id}>{data.name}</SelectItem>
      ))}
    </Select>
  )
}



export {
  SelectComponent,
  SelectOptionRole
}
