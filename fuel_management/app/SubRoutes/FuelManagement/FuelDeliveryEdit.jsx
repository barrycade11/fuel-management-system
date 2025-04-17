import React, { useState, useEffect, lazy } from "react";
import { useParams } from "react-router-dom";
import Notification from "~/Components/Notification";
import { useNavigate } from "react-router";
import StringRoutes from "~/Constants/StringRoutes";
import { useGetStationRecords } from "~/Hooks/Setup/Station/useStationRecordsApi";
import { Input, Button, Spinner, Select, SelectItem } from "@heroui/react";
const SettingsMultiSelectDropdown = lazy(() => import("../Settings/Components/SettingsMultiSelectDropdown"));


import { fetchStationEmployees, fetchStationShiftManagers, fetchStationStationManagers } from "~/Hooks/Setup/Station/StationEmployee/useStationEmployee";
import { fetchStationShifts, fetchStationShifts2 } from "~/Hooks/Setup/Station/StationShift/useStationShifts";


const FuelDeliveryEdit = () => { 

  const { fuelDeliveryId } = useParams();


  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [selectedStation, setSelectedStation] = useState("");
  const [date, setDate] = useState( new Date().toISOString().split("T")[0] );  
  const [shiftManager, setShiftManager] = useState([]);
  const [stationManager, setStationManager] = useState([]);
  const [shiftNo, setShiftNo] = useState("2nd Shift");
  const [receiver, setReceiver] = useState("Sample Receiver 1");

  const [selectedStationManager, setSelectedStationManager] = useState('')
  const [selectedShiftManager, setSelectedShiftManager] = useState('')
  const [selectedShift, setSelectedShift] = useState('')
  const [shifts, setShifts] = useState([]);   



  const  { 
    data: stations,
    isLoading: isLoadingStations,
    error: errorStations 
  } = useGetStationRecords('Stations'); 

  
  const [fuelData,setFuelData] = useState([
    { id: 1, fuel: "VPR", price: 72.5, beginningDip: "14,284", endDip: "19,155", delivery: "5,000", grossIncrease: "4,871", interimSales: 51, shortOver: 0 },
    { id: 2, fuel: "VPG", price: 70.4, beginningDip: "", endDip: "", delivery: "", grossIncrease: "", interimSales: "", shortOver: "" },
    { id: 3, fuel: "VPD", price: 69.6, beginningDip: "", endDip: "", delivery: "", grossIncrease: "", interimSales: "", shortOver: "" },
  ]);


  const handleBack = () => { 
    navigate(-1);
  }
  const handleAttachement = () => {
    navigate(`/${StringRoutes.fuelDeliveryAttachment}/${fuelDeliveryId??0}`);
  };

  const handleInputChange = (index, field, value) => {
    index = index-1;
    const updatedData = [...fuelData];
    updatedData[index][field] = value;

 
    //Auto compute. formula = (Delivery Value) - (Gross Increase)
    if (field === "delivery" || field === "grossIncrease") {
      const deliveryValue = parseFloat(updatedData[index].delivery.replace(/,/g, "")) || 0;
      const grossIncreaseValue = parseFloat(updatedData[index].grossIncrease.replace(/,/g, "")) || 0;
      const interimSalesValue = deliveryValue - grossIncreaseValue;
      updatedData[index].interimSales = (interimSalesValue);

      // console.log( "deliveryValue", deliveryValue, "grossIncreaseValue", grossIncreaseValue, "interimSalesValue", interimSalesValue, formatNumber(interimSalesValue));
    }
  
    // Auto compute: End Dip - (Beginning Dip + Delivery) - Interim Sales
    if (field === "endDip" || field === "beginningDip" || field === "delivery") {
      const beginningDipValue = parseFloat(updatedData[index].beginningDip.replace(/,/g, "")) || 0;
      const endDipValue = parseFloat(updatedData[index].endDip?.replace(/,/g, "")) || 0;
      const deliveryValue = parseFloat(updatedData[index].delivery?.replace(/,/g, "")) || 0;
      const interimSalesValue = parseFloat(updatedData[index].interimSales ) || 0;
  
      const shortOverValue = endDipValue - (beginningDipValue + deliveryValue) - interimSalesValue;
      updatedData[index].shortOver = (shortOverValue);

      // console.log( "beginningDipValue", beginningDipValue, "endDipValue", endDipValue, "deliveryValue", deliveryValue, "interimSalesValue", interimSalesValue, "shortOverValue", shortOverValue);
    }

    setFuelData(updatedData);
  }
  
  const formatNumber = (value) => {
    if (!value) return "0";
    const number = parseFloat(value.toString().replace(/,/g, "")); // Remove commas and parse as a number
    if (isNaN(number)) return value; // Return original value if it's not a valid number
    return new Intl.NumberFormat("en-US").format(number); // Format with commas
  };

    useEffect(() => {
        const getData = async () => {

          if (selectedStation !== '' && selectedStation !== undefined) {
            const result = await fetchStationShiftManagers(selectedStation)
            let tmpResultShiftManagers = []
            for (let item of result) {
              tmpResultShiftManagers.push({
                    id: item.id,
                    name: item.description
                })
            }
            setShiftManager(tmpResultShiftManagers)
          }

          if (selectedShiftManager !== '' && selectedShiftManager !== undefined) {
            const result = await fetchStationShifts2(selectedStation, selectedShiftManager) 
            let tmpResultShifts = []
            for (let item of result) {
                tmpResultShifts.push({
                    id: item.id,
                    name: item.shift
                })
            }
            setShifts(tmpResultShifts)               
          }

          if ( (selectedStation !== '' && selectedStation !== undefined) && (selectedShift !== '' && selectedShift !== undefined) ) {
            const result = await fetchStationStationManagers(selectedStation, selectedShift)
            let tmpResultStationManagers = []
            for (let item of result) {
              tmpResultStationManagers.push({
                    id: item.id,
                    name: item.description
                })
            }
            setStationManager(tmpResultStationManagers)
          }

        }
        getData()
    }, [selectedStation, selectedShiftManager, selectedShift] )

// console.log("shifts",shifts, "selectedStation",selectedStation,"selectedshift",selectedShift);
// console.log("shiftManager",shiftManager, "selectedShiftManager",selectedShiftManager);
// console.log("stationManager",stationManager, "selectedStationManager",selectedStationManager);


 

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
    <div> 
    {fuelDeliveryId && fuelDeliveryId>0 ? (
      <p>Editing Fuel Delivery ID: {fuelDeliveryId}</p>
    ) : (
      <p>Creating a New Fuel Delivery</p>
    )}
    </div>
    <br/>
    <br/>

        {notification && 
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification(null)}
          onConfirm={notification.onConfirm} 
          onCancel={notification.onCancel}  
        />}

      <div className="grid grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm">Effective Date</label>
          <input type="date" className="w-full border p-2 rounded" value={date} onChange={(e) => setDate(e.target.value)} />
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
                      setSelectedStation(e.target.value);  
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
        <div>
          <label className="block text-sm">Shift Manager</label>
                <Select
                    aria-label="Shift Manager"
                    className="w-full" 
                    variant="bordered"
                    labelPlacement="outside" 
                    placeholder="Select"
                    selectionMode="single"
                    selectedKey={[selectedShiftManager]} 
                    onChange={(e) => {
                      setSelectedShiftManager(e.target.value);  
                    }}
                    classNames={{
                        value: 'font-semibold text-gray-400'
                    }}
                >
                    {shiftManager?.map((item) => (
                        <SelectItem key={item?.id}>{item?.name}</SelectItem>
                    ))}
                </Select> 
        </div>
        <div>
          <label className="block text-sm">Shift No.</label>
          <Select
                    aria-label="Shifts"
                    className="w-full" 
                    variant="bordered"
                    labelPlacement="outside" 
                    placeholder="Select"
                    selectionMode="single"
                    selectedKey={[selectedShift]} 
                    onChange={(e) => {
                      setSelectedShift(e.target.value);  
                    }}
                    classNames={{
                        value: 'font-semibold text-gray-400'
                    }}
                >
                    {shifts?.map((item) => (
                        <SelectItem key={item?.id}>{item?.name}</SelectItem>
                    ))}
          </Select>  
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm">Delivery Receipt No.</label>
            <input
              type="text"
              className="border px-2 py-1 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm">Hauler</label>
            <input
              type="text"
              className="border px-2 py-1 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm">Plate No.</label>
            <input
              type="text"
              className="border px-2 py-1 rounded w-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm">Driver</label>
            <input
              type="text"
              className="border px-2 py-1 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm">Receiver</label>            
            <Select
                      aria-label="Receiver"
                      className="w-full" 
                      variant="bordered"
                      labelPlacement="outside" 
                      placeholder="Select"
                      selectionMode="single"
                      selectedKey={[selectedStationManager]} 
                      onChange={(e) => {
                        setSelectedStationManager(e.target.value);  
                      }}
                      classNames={{
                          value: 'font-semibold text-gray-400'
                      }}
                  >
                      {stationManager?.map((item) => (
                          <SelectItem key={item?.id}>{item?.name}</SelectItem>
                      ))}
            </Select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Tank Name</th>
              <th className="border p-2">Fuel</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Beginning Dip</th>
              <th className="border p-2">End Dip</th>
              <th className="border p-2">Delivery</th>
              <th className="border p-2">Gross Increase</th>
              <th className="border p-2">Interim Sales</th>
              <th className="border p-2">Short/Over</th>
            </tr>
          </thead>
          <tbody>
            {fuelData.map((row) => (
              <tr key={row.id}>
                <td className="border p-2 text-center">{row.id}</td>
                <td className="border p-2 text-center"><span className={`px-2 py-1 rounded text-white ${row.fuel === "VPR" ? "bg-red-500" : row.fuel === "VPG" ? "bg-green-500" : "bg-yellow-500"}`}>{row.fuel}</span></td>
                <td className="border p-2 text-center">{row.price}</td>
                <td className="border p-2 text-center">
                  <input
                    type="text"
                    className="border px-2 py-1 rounded w-full"
                    value={ formatNumber(row.beginningDip)}
                    onChange={(e) => handleInputChange(row.id, "beginningDip", e.target.value)}
                    placeholder="type here"
                  />
                </td>
                <td className="border p-2 text-center">
                  <input
                    type="text"
                    className="border px-2 py-1 rounded w-full"
                    value={formatNumber(row.endDip)}
                    onChange={(e) => handleInputChange(row.id, "endDip", e.target.value)}
                    placeholder="type here"
                  />
                </td>
                <td className="border p-2 text-center">
                  <input
                    type="text"
                    className="border px-2 py-1 rounded w-full"
                    value={formatNumber(row.delivery)}
                    onChange={(e) => handleInputChange(row.id, "delivery", e.target.value)}
                    placeholder="type here"
                  />
                </td>
                <td className="border p-2 text-center">
                  <input
                    type="text"
                    className="border px-2 py-1 rounded w-full"
                    value={formatNumber(row.grossIncrease)}
                    onChange={(e) => handleInputChange(row.id, "grossIncrease", e.target.value)}
                    placeholder="type here"
                  />
                </td>
                <td className="border p-2 text-center">
                  <input
                    type="text"
                    className="border px-2 py-1 rounded w-full"
                    value={formatNumber(row.interimSales)}
                    //onChange={(e) => handleInputChange(row.id, "interimSales", e.target.value)}
                    placeholder="type here"
                    readOnly={true}
                  />
                </td>
                <td className="border p-2 text-center">
                  <input
                    type="text"
                    className="border px-2 py-1 rounded w-full"
                    value={formatNumber(row.shortOver)}
                    //onChange={(e) => handleInputChange(row.id, "interimSales", e.target.value)}
                    placeholder="type here"
                    readOnly={true}
                  />
                </td> 
 
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={handleAttachement}>+ Attachment</button>
      </div>
      <div className="flex justify-end items-center gap-2 mb-4">
        <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600" onClick={handleBack}>Back</button>
        <button className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">Delete</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Save</button>
        <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">View History</button>
      </div>
    </div>
  );
};

export default FuelDeliveryEdit;
