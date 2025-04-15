import SimpleDropdown from "~/Components/SimpleDropdown";
import SimpleInput from "~/Components/SimpleInput";
import { X, ChevronDown, SearchIcon, SettingsIcon } from 'lucide-react';
import { Input, Button, avatar } from '@heroui/react'
import SettingsTable from "./Components/SettingsTable";
import useAccountMutation from "~/Hooks/Settings/useAccounts";
import { useFetchStationIdAndName } from "~/Hooks/Setup/Station/useFetchStationIdAndNameOnly";
import SettingsMultiSelectDropdown from "./Components/SettingsMultiSelectDropdown";
import { useEffect, useState } from "react";
import { addToast } from "@heroui/react";
import useSettingsState from "~/Hooks/Settings/useSettingsState";
import { useNavigate } from "react-router";
import StringRoutes from "~/Constants/StringRoutes";


const User = () => {
  const accountMutation = useAccountMutation();
  const [stationNames, setStationNames] = useState([]);
  const { selectedStations, accounts, onSetAccounts, onSetSelectedStations } = useSettingsState();

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedStations.size >= 1 && accounts.length >= 0) {
      onManageGetAccounts();
    }
  }, [selectedStations])

  /**
   * Shows a toast notification.
   *
   * @param {object} params - The toast parameters.
   * @param {string} params.title - The toast title.
   * @param {string} params.color - The toast color.
   * @param {string} params.description - The toast description.
   */
  const showToast = ({
    title = "",
    color = "danger",
    description = "",
  }) => addToast({
    timeout: 3000,
    title: title,
    description: description,
    color: color,
  });

  const handleViewUser = (user) => {
    // Navigate to user detail page or open modal
    navigate(StringRoutes.register + `/${user}`);
  };

  const handleSort = (sortConfig) => {
    // You can implement server-side sorting here if needed
  };

  const onManageGetAccounts = (e) => {
    accountMutation.mutate(e, {
      onError: (error) => {
        showToast({
          title: "Error",
          description: error.message,
          color: "danger",
        });
      },
      onSuccess: (response) => {
        onSetAccounts(response.data.body);
      },
    });
  };

  return (
    <div className="flex flex-col bg-white h-full">
      <div className="grid grid-cols-1 md:grid-cols-3 px-4">
        <div className="md:col-span-1">
          <span className="text-sm text-default-400 font-semibold">Station</span>
          <SettingsMultiSelectDropdown
            onChange={(e) => {
              onManageGetAccounts(e);
            }}
          />
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
            placeholder="Search User"
          />
          <Button
            radius="none"
            className="rounded-md bg-primary opacity-80 ml-2 text-white font-semibold"
            onPress={() => navigate(StringRoutes.register)}
          >
            Add New
          </Button>
        </div>

      </div>

      <SettingsTable
        data={accounts}
        onViewUser={handleViewUser}
        onSort={handleSort}
      />
    </div>
  )
}

export default User;
