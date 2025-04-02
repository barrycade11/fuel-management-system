import SimpleDropdown from "~/Components/SimpleDropdown";
import SimpleInput from "~/Components/SimpleInput";
import { X, ChevronDown, SearchIcon, SettingsIcon } from 'lucide-react';
import { Input, Button } from '@heroui/react'

const Chip = ({
  label 
}) => {
  return (
    <div className="flex flex-row my-1  items-center gap-2 bg-gray-300 px-2 text-sm text-default-700 font-semibold rounded-md">
      {label}
      <X size={10} />
    </div>
  )
}

const User = () => {
  return (
    <div className="flex flex-col bg-white h-full">

      <div className="grid grid-cols-1 md:grid-cols-3 px-4">

        <div className="md:col-span-1">
          <span className="text-sm text-default-400 font-semibold">Station</span>
          <div className="flex flex-row items-center w-full bg-gray-100 pr-2 shadow-sm">
            <div className="flex flex-row gap-2 flex-1 flex-wrap px-4 py-1 rounded-sm">
              <Chip label="4" />
              <Chip label="ALL" />
            </div>
            <ChevronDown size={14} />
          </div>
        </div>

        <div className="md:cols-span-1 md:col-start-3 justify-end flex flex-row items-end pt-5 md:p-0">
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

    </div>
  )
}

export default User;
