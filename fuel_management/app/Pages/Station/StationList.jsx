import Navbar from "~/Components/Navbar";
import TextBoxField from "../Login/Components/TextBoxField";
import { SearchIcon, SettingsIcon } from "lucide-react";
import PrimaryButton from "~/Components/PrimayButton";
import { Button, CircularProgress } from '@heroui/react'
import StationTable from "./Components/StationTable";
import { Outlet, useNavigate } from "react-router";
import StringRoutes from "~/Constants/StringRoutes";
import useStationStore from "~/Hooks/Setup/Station/Station/useStationStore";

const StationList = () => {
  const { onSetFetchTanks } = useStationStore()
  const navigate = useNavigate();
  return (
    <div className="flex flex-col bg-white h-full">
      <Navbar title="Stations" />
      <div className="flex flex-col md:flex-row md:justify-between p-4 ">
        <span className="text-lg py-2 font-semibold text-default-600">List of Stations</span>
        <div className="flex flex-row justify-between">
          <div className="flex-1">
            <TextBoxField
              placeholder="Search station"
              endContent={
                <div className="flex flex-row flex-grow">
                  <SearchIcon size={18} />
                  <SettingsIcon className="w-[30px]" size={18} />
                </div>
              }
            />
          </div>
          <PrimaryButton
            onClick={() => {
              onSetFetchTanks([])// clear when viweing
              navigate(StringRoutes.stationDetail)
            }}
            fullWidth={false}
            title="Add New" />
        </div>
      </div>

      <StationTable />
    </div>
  )
}

export default StationList
