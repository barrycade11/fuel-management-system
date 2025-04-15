import React, { useEffect, useState, Suspense, lazy } from "react"; 
import Dropdown from "~/Components/Dropdown";
import Notification from "~/Components/Notification";
import TableSkeleton from "~/Components/TableSkeleton";

const SettingsMultiSelectDropdown = lazy(() => import("../Settings/Components/SettingsMultiSelectDropdown"));  
const HeroUITable = lazy(() => import("~/Components/Table"));


import { today, getLocalTimeZone, CalendarDate, parseZonedDateTime, parseAbsolute, parseAbsoluteToLocal } from "@internationalized/date";
import {
  Select,
  SelectItem, 
  Input,
  Button,
  Accordion, 
  AccordionItem,
  DatePicker,
  Textarea,
  Spinner,
  Table, 
  TableHeader,
  TableColumn, 
  TableBody,
  TableRow,
  TableCell
} from "@heroui/react";
import {
  useGetFuelManagements, 
  useGetFuelManagementById,
  useAddFuelManagement,
  useUpdateFuelManagement,
  useDeleteFuelManagement
} from "~/Hooks/FuelManagement/useFuelManagementApi";

import {
  fetchfuelDeliveries,
} from "~/Hooks/FuelManagement/FuelDelivery/useFuelDelivery";
import { useGetStationRecords } from "~/Hooks/Setup/Station/useStationRecordsApi";
import { fetchDropdowns, fetchDropdownTypeList } from "~/Hooks/Setup/GlobalRecords/Dropdown/useDropdowns";
import { useGetGlobalRecords } from "~/Hooks/Setup/GlobalRecords/useGlobalRecordsApi";

const FuelDeliveryList = () => {


  // Fetch FuelMaster 
  const { 
    data: fuelDeliveries, 
    isLoading: isLoadingFuelDeliveries, 
    error: errorFuelDeliveries 
  } = fetchfuelDeliveries();
  

  // Fetch Fuel Prices 
  // const { 
  //   data: fuelPrices, 
  //   isLoading: isLoadingFuelPrices, 
  //   error: errorFuelPrices 
  // } = useGetFuelManagements('FuelPrices');


  // Fetch Stations 
  // const { 
  //   data: stations, 
  //   isLoading: isLoadingStations, 
  //   error: errorStations 
  // } = useGetStationRecords('Stations');

  // Fetch FuelMaster 
  // const { 
  //   data: fuels, 
  //   isLoading: isLoadingFuelMasters, 
  //   error: errorFuelMasters 
  // } = useGetGlobalRecords('FuelMasters');

  
  // console.log("FuelMasters", fuels)  
  console.table("FuelDeliveries", fuelDeliveries,"errorFuelDeliveries", errorFuelDeliveries)

  // Add FuelPrice 
  const { 
    mutateAsync: addFuelPrice, 
    isLoading: isAdding, 
    isSuccess: isAddSuccess, 
    error: addError 
  } = useAddFuelManagement('FuelPrice');

  // Update FuelPrice 
  const { 
    mutateAsync: updateFuelPrice, 
    isLoading: isUpdating, 
    isSuccess: isUpdateSuccess, 
    error: updateError 
  } = useUpdateFuelManagement('FuelPrice');

  // Delete FuelPrice 
  const { 
    mutateAsync: deleteFuelPrice, 
    isLoading: isDeleting, 
    isSuccess: isDeleteSuccess, 
    error: deleteError 
  } = useDeleteFuelManagement('FuelPrice');


  
  const [station, setStation] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [notification, setNotification] = useState(null);
  const [newFuelPrice, setNewFuelPrice] = useState({
    effectiveDate: today(getLocalTimeZone()),
    stationId: "",
    startTime: null,
    endTime: null, 
    reasonId: "",
    details: ""
  })

  const handleAdd = async () => {
    setNewFuelPrice({
      effectiveDate: today(getLocalTimeZone()),
      stationId: "",
      startTime: null,
      endTime: null, 
      reasonId: "",
      details: ""
    })

    setIsEditing(true);
  }

  const handleEdit = async (fuelPrice) => {
    setIsEditing(true);

    try {
      // fetch Dropdowns
      const reasonData = await fetchDropdownTypeList(13, fuelPrice.reasonid);

      setNewFuelPrice(prev => ({
        ...prev,
        ...fuelPrice,
        effectiveDate: parseAbsoluteToLocal(fuelPrice.effectiveDate),
        stationId: fuelPrice.stationid,
        startTime: ensureTimeFormat(fuelPrice.startTime),
        endTime: ensureTimeFormat(fuelPrice.endTime),
        reasonId: fuelPrice.reasonid, 
        details: fuelPrice.details
      }))
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {

    }
  }
 

  const formatDate = (dateObj) => {
    if (!dateObj || !dateObj.year || !dateObj.month || !dateObj.day) return null;
    return `${dateObj.year}-${String(dateObj.month).padStart(2, "0")}-${String(dateObj.day).padStart(2, "0")}`;
  };

  const ensureTimeFormat = (timeString) => {
    if (!timeString) return "00:00:00";
    
    const parts = timeString.split(':');
    if (parts.length === 2) {
      return `${parts[0]}:${parts[1]}:00`; 
    }
    return timeString; 
  };

  const formatTime = (timeString) => {
    if (!timeString) return "-";
    
    const [hours, minutes] = timeString.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    
    return `${hour12}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const columns = [
    { key: "id", label: "No.", hidden: false },
    { key: "stationcode", label: "Station Code", hidden: false },
    { key: "shift", label: "Shift No.", hidden: false },
    { key: "shiftManagerId", label: "Shift Manager", hidden: false },
    { key: "deliveryNo", label: "Delivery Receipt No", hidden: false },
  ]
 
  const customRender = {
    effectivedate: (item) => {
      if (!item) return '';
      const date = new Date(item);
      return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
    },
    actions: (item) => (
      <Button
        onClick={() => handleEdit(item)} 
        className="px-3 py-1 bg-blue-200 text-blue-800 rounded hover:bg-blue-300"
      >
        Edit
      </Button>
    ),
  };

  
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    setDate(new Date().toISOString().split("T")[0]); 
  }, []);

  console.log("station",station )


  return (
    <div className="p-6 bg-white rounded-lg shadow-md"> 
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm">Effective Date</label>
          <input type="date" className="w-full border p-2 rounded" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm">Station</label> 
          <SettingsMultiSelectDropdown 
            onChange={(e) => {
              setStation(e);
            }}/>
        </div>
      </div>  

      {notification && 
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification(null)}
          onConfirm={notification.onConfirm} 
          onCancel={notification.onCancel}
        />} 

          <HeroUITable 
            title="Fuel Delivery List" 
            data={fuelDeliveries} 
            columns={columns} 
            onEdit={handleEdit} 
            onAdd={handleAdd} 
            customRender={customRender} 
          />
        
    </div>
  );
};

export default FuelDeliveryList;
