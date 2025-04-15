import React, { useEffect, useState } from "react";
import HeroUITable from "~/Components/Table";
import Dropdown from "~/Components/Dropdown";
import Notification from "~/Components/Notification";
import TableSkeleton from "~/Components/TableSkeleton";
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
import { useGetStationRecords } from "~/Hooks/Setup/Station/useStationRecordsApi";
import { fetchDropdowns, fetchDropdownTypeList } from "~/Hooks/Setup/GlobalRecords/Dropdown/useDropdowns";
import { useGetGlobalRecords } from "~/Hooks/Setup/GlobalRecords/useGlobalRecordsApi";

const FuelPrice = () => {
  // Fetch Fuel Prices 
  const { 
    data: fuelPrices, 
    isLoading: isLoadingFuelPrices, 
    error: errorFuelPrices 
  } = useGetFuelManagements('FuelPrices');

  // Fetch Stations 
  const { 
    data: stations, 
    isLoading: isLoadingStations, 
    error: errorStations 
  } = useGetStationRecords('Stations');

  // Fetch FuelMaster 
  const { 
    data: fuels, 
    isLoading: isLoadingFuelMasters, 
    error: errorFuelMasters 
  } = useGetGlobalRecords('FuelMasters');

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

  const handleSave = async () => {
    console.log(fuelPrice)

    if (isSaving) return;
    setIsSaving(true);

    const payload = {
      effectiveDate: formatDate(newFuelPrice.effectiveDate),
      stationId: parseInt(newFuelPrice.stationId, 10),
      startTime: newFuelPrice.startTime,
      endTime: newFuelPrice.endTime,
      reasonId: parseInt(newFuelPrice.reasonId), 
      details: newFuelPrice.details
    }

    try {
      let fuelPriceId;

      if (newFuelPrice.id) {
        // Existing Fuel Price
        fuelPriceId = newFuelPrice?.id;
        console.log(fuelPriceId)

        // Update Fuel Price
        const response = await updateFuelPrice({ id: fuelPriceId, payload });

        fuelPriceId = response[0]?.id;

        console.log(fuelPriceId)
      } else {
        // New Fuel Price
        const response = await addFuelPrice(payload);
        fuelPriceId = response?.id;

        console.log(fuelPriceId)


      }
      setIsEditing(false);
      setNotification({ message: "Save successful", type: "success" });
    } catch (error) {
      setNotification({ message: "Error saving data", type: "error" });
      console.error("Error saving data:", error);
    } finally {
      setIsSaving(false); 
    }
  } 

  const handleDelete = (id) => {
    const handleConfirm = async () => {
        try {
            // Delete Fuel Price
            await deleteFuelPrice(id);

            setIsEditing(false);
            setNotification({ message: "Record deleted successfully!", type: "success" });
        } catch (error) {
            setNotification({ message: "Failed to delete record.", type: "error" });
            console.error("Error deleting record:", error);
        }
    };

    const handleCancel = () => {
        setNotification(null);
    };

    setNotification(prev => ({
      ...prev, 
      message: "Are you sure you want to delete this record?",
      type: "delete",
      onConfirm: handleConfirm, 
      onCancel: handleCancel,  
    }));
  };

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
    { key: "id", label: "No.", hidden: true },
    { key: "station", label: "Station", hidden: false },
    { key: "reason", label: "Reason for Fuel Price Change", hidden: false },
    { key: "effectivedate", label: "Effective Date", hidden: false },
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

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {notification && 
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification(null)}
          onConfirm={notification.onConfirm} 
          onCancel={notification.onCancel}
        />}
      {isLoadingFuelPrices ? (
        <TableSkeleton columns={4} rows={5}/>
      ) : isEditing ? (
        <>
        <div className="grid grid-cols-12 gap-3 mb-4">
          <div className="col-span-2 gap-3">
            <DatePicker  
              isRequired 
              label="Effective Date" 
              placeholder="Pick a date" 
              granularity="day"
              value={newFuelPrice.effectiveDate} 
              onChange={(date) => setNewFuelPrice({ ...newFuelPrice, effectiveDate: date })}
              className="max-w-[284px]"
            />
          </div>

          <div className="col-span-3 gap-3">
            <Dropdown 
              label="Station"
              customOptions={stations.body.map(sta => ({
                id: sta.id,
                name: sta.name
              }))}
              value={newFuelPrice.stationId} 
              // onChange={(e) => setNewTarget({ 
              //   ...newTarget, 
              //   stationId: parseInt(e.target.value, 10)
              // })} 
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table className="w-full overflow-x-auto">
            <TableHeader>
              <TableColumn>Fuel</TableColumn>
              <TableColumn>Current Price (02/25/2025)</TableColumn>
              <TableColumn>New Price (RSOP) {formatDate(newFuelPrice.effectiveDate)}</TableColumn>
              <TableColumn>Remarks</TableColumn>
            </TableHeader>

            <TableBody>
              {fuels.map((fuel, index) => (
                <TableRow key={fuel.id}>
                  <TableCell>
                    <span className="px-3 py-1 text-white rounded-lg" style={{ backgroundColor: fuel.color }}>
                      {fuel.code}
                    </span>
                  </TableCell>

                  <TableCell>
                    No price yet
                  </TableCell>

                  <TableCell>
                    <Input 
                      className="w-full" 
                      // label="Enter Price" 
                      placeholder="Enter Price" 
                      // value={newFuel.code}
                      // onChange={(e) => setNewFuel({ ...newFuel, code: e.target.value })}
                      isRequired
                    />    
                  </TableCell>

                  <TableCell>
                  <Input 
                      className="w-full" 
                      // label="Enter Price" 
                      placeholder="Enter Remarks" 
                      // value={newFuel.code}
                      // onChange={(e) => setNewFuel({ ...newFuel, code: e.target.value })}
                      isRequired
                    />  
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="grid grid-cols-12 gap-3 mb-4 mt-4">
          <div className="col-span-4 gap-3">
            <Dropdown 
              label="Reason to Fuel Price Change"
              typeId={13} 
              value={newFuelPrice.reasonId} 
              onChange={(e) => setNewFuelPrice({ ...newFuel, reasonId: e.target.value })} 
            />
          </div>
        </div>

        
        <div className="grid grid-cols-12 gap-3 mb-4 mt-4">
          <div className="col-span-4 gap-3">
            <Textarea 
              className="w-full mb-2" 
              label="Details" 
              placeholder="Enter Remarks" 
              value={newFuelPrice.details}
              onChange={(e) => setNewFuelPrice({ ...newFuelPrice, details: e.target.value })}
              isRequired
            />
          </div>
        </div>

        <div className="flex items-center justify-between p-4">
          <Button color="primary" variant="solid" className="w-min rounded-md font-semibold text-base text-white">
            + Attachments
          </Button>
          <div className="flex gap-2">
            <Button onClick={() => setIsEditing(false)} color="default" className="w-min rounded-md font-semibold text-base text-white">
                Back
            </Button>
            {newFuelPrice.id ? (
              <Button onClick={() => handleDelete(newEmployee.id)} color="danger" className="w-min rounded-md font-semibold text-base text-white">
                Delete
              </Button>
            ) : (
              <div></div> 
            )}
            <Button 
              onClick={handleSave} 
              disabled={isSaving} 
              isLoading={isSaving}
              spinner={<Spinner size="sm" variant="wave" color="default" />}
              spinnerPlacement="end"
              color="primary"
              className="w-min rounded-md font-semibold text-base text-white"
            >
              {isSaving ? "Saving" : "Save"}
            </Button>
            <Button className="w-min rounded-md font-semibold text-base text-blue-600 bg-blue-200">
                View History
            </Button>
          </div>
        </div>
        </>
        ) : (
          <HeroUITable 
            title="Fuel Price" 
            data={fuelPrices} 
            columns={columns} 
            onEdit={handleEdit} 
            onAdd={handleAdd} 
            customRender={customRender} 
          />
        )}
    </div>
  );
};

export default FuelPrice;
