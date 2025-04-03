import { useFetchStationIdAndName } from "~/Hooks/Setup/Station/useFetchStationIdAndNameOnly";
import { ChevronDown, X } from 'lucide-react';
import { useState, useMemo, useEffect } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import useSettingsState from "~/Hooks/Settings/useSettingsState";

const Chip = ({
  label,
  onRemove = null
}) => {
  return (
    <div className="flex flex-row my-1 items-center gap-2 bg-gray-300 px-2 text-sm text-default-700 font-semibold rounded-md">
      {label}
      <X size={10} onClick={onRemove} className="cursor-pointer" />
    </div>
  )
}

const ChipCount = ({ count = 0 }) => {
  return (
    <div className="flex flex-row my-1 px-1">
      <div className="h-full border border-l-2 border-l-gray-400 rounded-l-lg" />
      <div className="h-full border border-l-2 border-l-gray-400 rounded-l-lg" />
      <span className="p-0 text-xs bg-gray-300 px-2 rounded-sm">{count}</span>
    </div>
  )
}

const SettingsMultiSelectDropdown = ({
  onChange = () => {},
}) => {
  const { isLoading, isError, data = [], refetch } = useFetchStationIdAndName();
  const { selectedStations, onSetSelectedStations } = useSettingsState();
  
  // Initialize component state from Zustand store
  const [localSelectedKeys, setLocalSelectedKeys] = useState(new Set([...selectedStations]));
  
  // This effect syncs the local state with the Zustand store when the store changes externally
  useEffect(() => {
    if (!arraysEqual([...localSelectedKeys], [...selectedStations])) {
      setLocalSelectedKeys(new Set([...selectedStations]));
    }
  }, [selectedStations]);
  
  // Helper function to compare arrays
  const arraysEqual = (a, b) => {
    if (a.length !== b.length) return false;
    return a.every((val, index) => val === b[index]);
  };

  const handleSelectKeys = (keys) => {
    const newKeys = new Set(keys);
    setLocalSelectedKeys(newKeys);
    onSetSelectedStations(newKeys);
    onChange(newKeys);
  };
  
  const handleRemoveChip = (keyToRemove) => {
    const newKeys = new Set([...localSelectedKeys].filter(key => key !== keyToRemove));
    setLocalSelectedKeys(newKeys);
    onSetSelectedStations(newKeys);
    onChange(newKeys);
  };

  if (isLoading) {
    return (
      <div className="flex flex-row items-center p-2 w-64 bg-gray-100 pr-2 shadow-sm">
        <span className="text-default-400">Loading...</span>
      </div>
    )
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <div className="flex flex-row items-center bg-gray-100 pr-2 shadow-sm">
          <div className="flex flex-row gap-2 flex-grow flex-wrap px-4 py-1 rounded-sm">
            {
              localSelectedKeys.size > 0 ? <ChipCount count={localSelectedKeys.size} /> : <span className="text-sm text-default-500">Select station</span>
            }
            {
              [...localSelectedKeys].map((key) => (
                <Chip 
                  key={key} 
                  label={key} 
                  onRemove={() => handleRemoveChip(key)} 
                />
              ))
            }
          </div>
          <ChevronDown size={14} />
        </div>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Multiple selection example"
        closeOnSelect={false}
        selectedKeys={localSelectedKeys}
        selectionMode="multiple"
        variant="flat"
        onSelectionChange={handleSelectKeys}
      >
        {
          data?.body?.map((item) => (
            <DropdownItem key={item.name}>{item.name}</DropdownItem>
          )) || []
        }
      </DropdownMenu>
    </Dropdown>
  )
}

export default SettingsMultiSelectDropdown;

