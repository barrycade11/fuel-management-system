import Navbar from "~/Components/Navbar";
import TextBoxField from "../Login/Components/TextBoxField";
import { SearchIcon, SettingsIcon } from "lucide-react";
import PrimaryButton from "~/Components/PrimayButton";
import { Button, CircularProgress } from '@heroui/react'
import StationTable from "./Components/StationTable";
import { Outlet, useNavigate } from "react-router";
import StringRoutes from "~/Constants/StringRoutes";

const Station = () => {
  return (
    <>
      <Outlet />
    </>
  )
}

export default Station;
