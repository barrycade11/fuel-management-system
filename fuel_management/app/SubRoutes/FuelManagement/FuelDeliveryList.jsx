import React, { useEffect, useState, Suspense, lazy, useMemo  } from "react";  
import Notification from "~/Components/Notification";
import TableSkeleton from "~/Components/TableSkeleton";
import MultiSelect from "~/Components/MultiSelect";
import MultiSelectDropdown from "~/Components/MultiSelectDropdown";

import StringRoutes from "~/Constants/StringRoutes";
import { Input, Button, Spinner, Select, SelectItem } from "@heroui/react";

const SettingsMultiSelectDropdown = lazy(() => import("../Settings/Components/SettingsMultiSelectDropdown"));  
// const HeroUITable = lazy(() => import("~/Components/Table"));

import  HeroUITable  from "~/Components/Table";


import { today, getLocalTimeZone, CalendarDate, parseZonedDateTime, parseAbsolute, parseAbsoluteToLocal } from "@internationalized/date";
 
import { fetchfuelDeliveries } from "~/Hooks/FuelManagement/FuelDelivery/useFuelDelivery";
import { useGetStationRecords } from "~/Hooks/Setup/Station/useStationRecordsApi";


import { useNavigate } from "react-router"; 

 

const FuelDeliveryList = () => {
  const navigate = useNavigate();  
  const [date, setDate] = useState( localStorage.getItem('fuel-delivery.effectivedate') || new Date().toISOString().split("T")[0] ); 
  const [station, setStation] = useState(false);  
  const [notification, setNotification] = useState(null);
  const [selectedStation, setSelectedStation] = useState( localStorage.getItem('fuel-delivery.station') || "");
  const [newFuelDeliveries, setNewFuelDeliveries] = useState([]); 
  const [loading, setLoading] = useState(false);  
  const [fuelDeliveryId, setFuelDeliveryId] = useState(0);

  const  { 
    data: stations,
    isLoading: isLoadingStations,
    error: errorStations 
  } = useGetStationRecords('Stations'); 
 
  // Fetch Stations 

  const getFuelDeliveries = async () => {
      setLoading(true); 
        try {
            const data = await fetchfuelDeliveries({effectivedate:date, stationids:selectedStation});
            setNewFuelDeliveries(data);
            console.log("getFuelDeliveries",data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        } 
    };
  
  useEffect(() => { 
      getFuelDeliveries();      
      localStorage.setItem('fuel-delivery.effectivedate', date);
      localStorage.setItem('fuel-delivery.station', selectedStation); 
    }, [date,selectedStation]);
     

  const handleAdd = async () => {       
    navigate(`/${StringRoutes.fuelDelivery}`); 
  }

  const handleEdit = async (fuelDelivery) => {    
    navigate(`/${StringRoutes.fuelDelivery}/${fuelDelivery.id}`);
  }
  
   


  const columns = [
    { key: "id", label: "No.", hidden: true },
    { key: "stationcode", label: "Station Code", hidden: false },
    { key: "station", label: "Station Description", hidden: true },
    { key: "shift", label: "Shift No.", hidden: false },
    { key: "shiftmanager", label: "Shift Manager", hidden: false },
    { key: "deliveryno", label: "Delivery Receipt No", hidden: false },
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
        View
      </Button>
    ),
  };

  console.log("Selected Date:", localStorage.getItem('fuel-delivery.effectivedate'));
  console.log("Selected Station:", localStorage.getItem('fuel-delivery.station'));
  //  console.log("Stations:", stations);  
  //  console.log("Selected Station:", selectedStation);  
  return ( 
    <div className="p-6 bg-white rounded-lg shadow-md">  
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm">Effective Date</label>
          <input type="date" className="w-full border p-2 rounded" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>  
          <label className="block text-sm">Stations</label>
                <Select
                    aria-label="Stations"
                    className="w-full" 
                    variant="bordered"
                    labelPlacement="outside" 
                    placeholder="Select"
                    selectionMode="multiple"
                    selectedKey={[selectedStation]} 
                    onChange={(e) => {
                      setSelectedStation(e?.target?.value);  
                    }}
                    classNames={{
                        value: 'font-semibold text-gray-400'
                    }}
                >
                    {stations?.body?.map((item) => (
                        <SelectItem key={item?.id}>{item?.name}</SelectItem>
                    ))}
                </Select>
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

        {
          loading ?  
            (
              <TableSkeleton columns={columns.length} rows={5}/>
            )
        : 
            (
            <HeroUITable 
              title={"Fuel Delivery List"} 
              data={newFuelDeliveries} 
              columns={columns} 
              onEdit={handleEdit} 
              onAdd={handleAdd} 
              customRender={customRender}  
            /> 
           ) 
        }
    </div>
  );
};

export default FuelDeliveryList;
