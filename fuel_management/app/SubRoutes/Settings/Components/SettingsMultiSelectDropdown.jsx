import { Select, SelectItem } from "@heroui/react";
import { X } from "lucide-react";
import { useState } from 'react';
import useSettingsState from "~/Hooks/Settings/useSettingsState";
import { useFetchStationIdAndName } from "~/Hooks/Setup/Station/useFetchStationIdAndNameOnly";

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
    <div className="flex flex-row my-1  bg-gray-200 px-1" style={{ height: '20px' }}>
      <div className="h-full border border-l-2 border-l-gray-400 rounded-l-lg" />
      <div className="h-full border border-l-2 border-l-gray-400 rounded-l-lg" />
      <span className="p-0 text-xs bg-gray-300 px-2 rounded-sm">{count}</span>
    </div>
  )
}

const SettingsMultiSelectDropdown = ({
  onChange = () => { },
}) => {
  const { isLoading, isError, error, data = [], refetch } = useFetchStationIdAndName();
  const [selectedKeys, setSelectedKeys] = useState(new Set([]))

  if (isLoading) {
    return (
      <div className="flex flex-row items-center p-2 w-64 bg-gray-100 pr-2 shadow-sm">
        <span className="text-default-400">Loading...</span>
      </div>
    )
  }

  const handleSelectionChange = (selectedKeys) => {
    setSelectedKeys(selectedKeys);
    onChange(selectedKeys);
  };

  const removeStation = (stationToRemove) => {
    setSelectedKeys((prevState) => {
      const updatedKeys = new Set(prevState); // Clone the previous Set
      updatedKeys.delete(stationToRemove); // Remove the specific key
      return updatedKeys; // Update state immutably
    });
  };

  const renderValue = (items) => {
    return (
      <div className="flex flex-wrap gap-1">
        {items.map((item) => (
          <Chip
            key={item.key}
            label={item.textValue}
            onRemove={() => removeStation(item.key)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-100 rounded-lg">
      <Select
        onChange={(e) => { }}
        onSelectionChange={handleSelectionChange}
        aria-labelledby="Station Assignments"
        placeholder="Select Stations"
        radius="none"
        fullWidth
        selectionMode="multiple"
        className="flex-1"
        labelPlacement="outside-left"
        label={<ChipCount count={selectedKeys.size} />}
        renderValue={renderValue}
        selectedKeys={selectedKeys}
      >
        {
          data.body.map((station) => (
            <SelectItem key={station.name} textValue={station.name}>
              {station.name}
            </SelectItem>
          ))
        }
      </Select>

    </div>

  )
}

export default SettingsMultiSelectDropdown;
