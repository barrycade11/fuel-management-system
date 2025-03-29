import { Select } from "@heroui/react";

const SelectComponent = ({
  label = "",
  children
}) => {
  return (
    <div className="flex flex-col w-[200px]">
      <span className="text-gray-500 text-small py-1 font-normal">{label}</span>
      <Select radius="none" className="max-w-xs rounded-none" placeholder="Select role">
       {children} 
      </Select>
    </div>
  )

}

export default SelectComponent;

