import React, { useEffect, useState } from "react";
import Table from "~/Components/Table";
import Dropdown from "~/Components/Dropdown";
import MultiDropdown from "~/Components/MultiDropdown";
import Notification from "~/Components/Notification";
import TableSkeleton from "~/Components/TableSkeleton";
import { 
  useGetGlobalRecords, 
  useGetGlobalRecordById, 
  useAddGlobalRecord, 
  useUpdateGlobalRecord, 
  useDeleteGlobalRecord 
} from "~/Hooks/Setup/GlobalRecords/useGlobalRecordsApi";
import { 
  fetchCustomerContacts, 
  useAddCustomerContactsByCustomerId,
  useDeleteCustomerContactsByCustomerId
} from "~/Hooks/Setup/GlobalRecords/CustomerContact/useCustomerContacts";
import { 
  fetchCustomerVehicles, 
  useAddCustomerVehiclesByCustomerId,
  useDeleteCustomerVehiclesByCustomerId
} from "~/Hooks/Setup/GlobalRecords/CustomerVehicle/useCustomerVehicles";
import { useGenerateCustomerCode } from "~/Hooks/Setup/GlobalRecords/Customer/useCustomers";
import { useGetStationRecords } from "~/Hooks/Setup/Station/useStationRecordsApi";
import DropdownStatus from "~/Components/DropdownStatus";
import {
  Select,
  SelectItem,
  Input,
  Button,
  Accordion, 
  AccordionItem,
  DatePicker,
  Textarea,
  Spinner
} from "@heroui/react";
import { fetchDropdowns, fetchDropdownTypeList } from "~/Hooks/Setup/GlobalRecords/Dropdown/useDropdowns";

const Customer = () => {
  // Fetch Customer 
  const { 
    data: customers, 
    isLoading: isLoadingCustomers, 
    error: errorECustomers
  } = useGetGlobalRecords('Customers');

  // Fetch Generated Code 
  const { 
    data: generatedCode, 
    isLoading: isLoadingGeneratedCode, 
    error: errorGeneratingCode 
  } = useGenerateCustomerCode('Customer');

  // Fetch Stations 
  const { 
    data: stations, 
    isLoading: isLoadingStations, 
    error: errorStations 
  } = useGetStationRecords('Stations');

  // Add Customer 
  const { 
    mutateAsync: addCustomer, 
    isLoading: isAdding, 
    isSuccess: isAddSuccess, 
    error: addError 
  } = useAddGlobalRecord('Customer');

  // Update Customer 
  const { 
    mutateAsync: updateCustomer, 
    isLoading: isUpdating, 
    isSuccess: isUpdateSuccess, 
    error: updateError 
  } = useUpdateGlobalRecord('Customer');

  // Delete Customer 
  const { 
    mutateAsync: deleteCustomer, 
    isLoading: isDeleting, 
    isSuccess: isDeleteSuccess, 
    error: deleteError 
  } = useDeleteGlobalRecord('Customer');

  // Add Customer Contacts 
  const { 
    mutateAsync: addCustomerContact, 
    isLoading: isAddingCustomerContact, 
    isSuccess: isAddCustomerContactSuccess, 
    error: addErrorCustomerContact 
  } = useAddCustomerContactsByCustomerId('Customer');

  // Delete Customer Contacts 
  const { 
    mutateAsync: deleteCustomerContact, 
    isLoading: isDeletingCustomerContact, 
    isSuccess: isDeleteCustomerContactSuccess, 
    error: deleteErrorCustomerContact 
  } = useDeleteCustomerContactsByCustomerId('Customer');

  // Add Customer Vehicles 
  const { 
    mutateAsync: addCustomerVehicle, 
    isLoading: isAddingCustomerVehicle, 
    isSuccess: isAddCustomerVehicleSuccess, 
    error: addErrorCustomerVehicle 
  } = useAddCustomerVehiclesByCustomerId('Customer');

  // Delete Customer Vehicles 
  const { 
    mutateAsync: deleteCustomerVehicle, 
    isLoading: isDeletingCustomerVehicle, 
    isSuccess: isDeleteCustomerVehicleSuccess, 
    error: deleteErrorCustomerVehicle 
  } = useDeleteCustomerVehiclesByCustomerId('Customer');

  const [relationships, setRelationships] = useState([]); 
  const [customerContacts, setCustomerContacts] = useState([]); 
  const [customerVehicles, setCustomerVehicles] = useState([]);
  const [loadingCustomerContacts, setLoadingCustomerContacts] = useState(true);
  const [loadingCustomerVehicles, setLoadingCustomerVehicles] = useState(true);
  const [makeModels, setMakeModels] = useState([]); 
  const [vehicleStatuses, setVehicleStatuses] = useState([]); 
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingCustomerContacts, setIsEditingCustomerContacts] = useState(false);
  const [isEditingCustomerVehicles, setIsEditingCustomerVehicles] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [notification, setNotification] = useState(null);
  const [newCustomer, setNewCustomer] = useState({  
    code: generatedCode?.code || "", 
    name: "",
    tin: "",
    stationId: [], 
    billingAddress: "", 
    provinceId: "",
    cityId: "",
    barangayId: "",
    contactNo: "", 
    email: "",  
    taxCode: "",  
    customerStatusId: ""
  });
  const [newCustomerContacts, setNewCustomerContacts] = useState({  
    name: "", 
    contactNo: "",
    details: "",
  });
  const [newCustomerVehicles, setNewCustomerVehicles] = useState({  
    plateNo: "", 
    vehicleMakeModelId: "",
    details: "",
    vehicleStatusId: "",
  });
  
  const handleAdd = async () => {
    let codeData = generatedCode;

    setNewCustomer({ 
      code: codeData.code, 
      name: "",
      tin: "",
      stationId: [], 
      billingAddress: "", 
      provinceId: "",
      cityId: "",
      barangayId: "",
      contactNo: "", 
      email: "",  
      taxCode: "",  
      customerStatusId: ""
    });

    setCustomerContacts([])
    setCustomerVehicles([])
    setLoadingCustomerContacts(false);
    setLoadingCustomerVehicles(false);
    setIsEditing(true);
  };

  const handleEdit = async (customer) => {
    setIsEditing(true);
    try {
      // Fetch Contacts 
      const rawContacts = await fetchCustomerContacts(customer.id);
      const contacts = rawContacts.map(c => ({
        ...c,
        contactNo2: c.contactNo2,
      }));
  
      // Fetch Vehicles 
      const rawVehicles = await fetchCustomerVehicles(customer.id);
      const vehicles = rawVehicles.map(v => ({
        ...v,
        vehicle: v.vehicle,
      }));
  
      // Fetch dropdowns
      await Promise.all([
        fetchDropdownTypeList(14, customer.provinceid),
        fetchDropdownTypeList(15, customer.cityid),
        fetchDropdownTypeList(16, customer.barangayid),
        fetchDropdownTypeList(9, customer.taxcodeid),
        fetchDropdownTypeList(8, customer.customerstatusid)
      ]);
  
      // Update customerLin if available
      if (customer.customerLin && Array.isArray(customer.customerLin)) {
        const stationIds = customer.customerLin.map(item =>
          parseInt(item.stationId, 10)
        );
        console.log(customer)
        console.log(stationIds)

        setNewCustomer((prev) => ({
          ...prev,
          ...customer,
          stationId: stationIds,
          customerContacts: contacts,
          customerVehicles: vehicles
        }));
      }
      
  
      // Handle vehicle make and model data
      if (vehicles && vehicles.length > 0) {
        const vehicleWithMakeModel = await Promise.all(
          vehicles.map(async (vehicle) => {
            try {
              const vehicleData = await fetchDropdownTypeList(10, vehicle.makeModelId);
              return {
                ...vehicle,
                makeModelId: Number(vehicle.makeModelId),
                vehicle: vehicleData?.[0]?.name || "Unknown"
              };
            } catch (error) {
              console.error("Error fetching make and model data:", error);
              return {
                ...vehicle,
                makeModelId: Number(vehicle.makeModelId),
                vehicle: "Unknown"
              };
            }
          })
        );
        setCustomerVehicles(vehicleWithMakeModel);
      } else {
        setCustomerVehicles([]); // If no vehicles, set as empty
      }
  
      // Handle vehicle status data
      if (vehicles && vehicles.length > 0) {
        const vehicleWithStatus = await Promise.all(
          vehicles.map(async (vehicle) => {
            try {
              const vehicleStatusData = await fetchDropdownTypeList(11, vehicle.vehicleStatusId);
              return {
                ...vehicle,
                vehicleStatusId: Number(vehicle.vehicleStatusId),
                vehicle: vehicleStatusData?.[0]?.name || "Unknown"
              };
            } catch (error) {
              console.error("Error fetching vehicle status data:", error);
              return {
                ...vehicle,
                vehicleStatusId: Number(vehicle.vehicleStatusId),
                vehicle: "Unknown"
              };
            }
          })
        );
        setCustomerVehicles(vehicleWithStatus);
      } else {
        setCustomerVehicles([]); 
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingCustomerContacts(false);
      setLoadingCustomerVehicles(false);
    }
  };  

  const handleSave = async () => {
    if (!newCustomer.name || !newCustomer.tin || !newCustomer.stationId.length > 0 ||
        !newCustomer.billingAddress || !newCustomer.provinceId || !newCustomer.cityId ||
        !newCustomer.barangayId || !newCustomer.contactNo || !newCustomer.email ||
        !newCustomer.taxCodeId || !newCustomer.customerStatusId 
    ) {
      setNotification({ message: "All fields are required.", type: "error" });
      return;
    }

    if (isSaving) return;
    setIsSaving(true);

    const payload = {
      name: newCustomer.name,
      tin: newCustomer.tin,
      billingAddress: newCustomer.billingAddress, 
      provinceId: parseInt(newCustomer.provinceId, 10),
      cityId: parseInt(newCustomer.cityId, 10),
      barangayId: parseInt(newCustomer.barangayId, 10),
      contactNo: newCustomer.contactNo,
      email: newCustomer.email,
      taxCodeId: parseInt(newCustomer.taxCodeId, 10),
      customerStatusId: parseInt(newCustomer.customerStatusId, 10),
      stations: newCustomer.stationId.map(id => ({ stationId: id }))
    };

    console.log(payload)

    try {
        let customerId;

        if (newCustomer.id) {
          // Existing Customer 
          customerId = newCustomer.id;

          // console.log(customerId)
          // console.log(customerContacts)
          // Update Customer 
          const response = await updateCustomer({ id: customerId, payload });

          // Delete and Add new Contacts 
          if (customerId && Array.isArray(customerContacts)) {
            await deleteCustomerContact(customerId);
          
            if (customerContacts.length > 0) {
              await Promise.all(
                customerContacts.map(contact => addCustomerContact({ id: customerId, payload: contact }))
              );
            }
          }

          // Delete and Add new Vehicles 
          if (customerId && Array.isArray(customerVehicles)) {
            await deleteCustomerVehicle(customerId);
          
            if (customerVehicles.length > 0) {
              await Promise.all(
                customerVehicles.map(vehicle => addCustomerVehicle({ id: customerId, payload: vehicle }))
              );
            }
          }

        } else {
          // New Customer 
          const response = await addCustomer(payload);
          customerId = response[0]?.id;

          console.log("payload: ", payload)
          console.log("id: ", customerId)
          console.log("response: ", response)
          console.log("contacts: ", customerContacts)

          // Add Contacts
          if (customerContacts.length > 0) {
            await Promise.all(
              customerContacts.map(contact => addCustomerContact({ id: customerId, payload: contact }))
            );
          }

          // Add Vehicles
          if (customerVehicles.length > 0) {
            await Promise.all(
              customerVehicles.map(vehicle => addCustomerVehicle({ id: customerId, payload: vehicle }))
            );
          }
        }

        setIsEditing(false);
        setNotification({ message: "Save successful", type: "success" });

    } catch (error) {
        setNotification({ message: "Error saving data", type: "error" });
        console.error("Error saving data:", error);
    } finally {
      setIsSaving(false); 
    }
  };

  const handleDelete = (id) => {
    const handleConfirm = async () => {
        try {
            // Delete all records if Customer is deleted 
            await deleteCustomer(id);
            await deleteCustomerContact(id);
            await deleteCustomerVehicle(id);

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

  const columns = [
    { key: "id", label: "No.", hidden: true },
    { key: "code", label: "Customer Code", hidden: false },
    { key: "name", label: "Customer Name", hidden: false },
    { key: "tin", label: "TIN", hidden: false },
    { key: "stations", label: "Stations", hidden: true },
    { key: "billingAddress", label: "Billing Address", hidden: true },
    { key: "province", label: "Province", hidden: true },
    { key: "city", label: "City", hidden: true },
    { key: "barangay", label: "Barangay", hidden: true },
    { key: "contactNo", label: "Contact No.", hidden: true },
    { key: "taxCode", label: "Tax Code", hidden: true },
    { key: "customerStatus", label: "Customer Status", hidden: true }
  ];

  const customRender = {
    customerLin: (customerLinArray) => {
      console.log(customerLinArray)
      if (!Array.isArray(customerLinArray) || customerLinArray.length === 0) {
        return "N/A";
      }
    
      return customerLinArray.map(sub => sub.station || `ID: ${sub.stationId}`).join(", ");
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

  const handleAddCustomerContacts = () => {
    setNewCustomerContacts({
      name: "", 
      contactNo: "",
      details: "",
    })
    setIsEditingCustomerContacts(true);
  }

  const handleEditCustomerContacts = async (customerContact) => {
    setNewCustomerContacts({
      ...customerContact,
      contactNo2: customerContact.contactNo2 || customerContact.contactNo, // fallback
    });
  
    setIsEditingCustomerContacts(true);
  };  

  const handleSaveCustomerContacts = async () => {
    if (!newCustomerContacts.name || !newCustomerContacts.contactNo2 || !newCustomerContacts.details) {
      setNotification({ message: "All fields are required.", type: "error" });
      return;
    }
    if (isSaving) return;
    setIsSaving(true);

    try {
      let updatedContacts = [...customerContacts];
  
      if (newCustomerContacts.id) {
        updatedContacts = updatedContacts.map(contact =>
          contact.id === newCustomerContacts.id
            ? {
                ...newCustomerContacts,
                contactNo2: newCustomerContacts.contactNo2,
              }
            : contact
        );
      } else {
        const tempId = `temp-${Date.now()}`;
        const newContact = {
          ...newCustomerContacts,
          id: tempId,
          contactNo2: newCustomerContacts.contactNo2 || newCustomerContacts.contactNo,
        };
  
        updatedContacts = [...updatedContacts, newContact];
      }
      setIsSaving(false);
      setCustomerContacts(updatedContacts);
      setIsEditingCustomerContacts(false);
      setNotification({ message: "Save successful (temporary)", type: "success" });
    } catch (error) {
      setNotification({ message: "Error saving data", type: "error" });
      console.error("Error saving data:", error);
    }
  };  

  const handleDeleteCustomerContacts = (id) => {
    const handleConfirm = () => {
        try {
            setIsEditingCustomerContacts(false);
            setNotification({ message: "Temporary record deleted successfully!", type: "success" });

            setCustomerContacts((prevCustomerContacts) => 
                prevCustomerContacts.filter(customerContact => customerContact.id !== id)
            );
        } catch (error) {
            setNotification({ message: "Failed to delete temporary record.", type: "error" });
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

  const customerContactsColumns = [
    { key: "id", label: "No.", hidden: true },
    { key: "name", label: "Name", hidden: false },
    { key: "contactNo2", label: "Contact No.", hidden: false }, 
    { key: "details", label: "Details", hidden: true },
  ];

  const customRenderCustomerContacts = {
    actions: (item) => (
      <Button
        onClick={() => handleEditCustomerContacts(item)} 
        className="px-3 py-1 bg-blue-200 text-blue-800 rounded hover:bg-blue-300"
      >
        Edit
      </Button>
    ),
  };

  // Customer Vehicle Make and Model
  const getMakeModels = async () => {
    try {
      const response = await fetchDropdowns(10); 
      setMakeModels(response); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getMakeModels();
  }, []);

  // Customer Vehicle Status
  const getVehicleStatuses = async () => {
    try {
      const response = await fetchDropdowns(11); 
      setVehicleStatuses(response); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getVehicleStatuses();
  }, []);

  const handleAddCustomerVehicles = () => {
    setNewCustomerVehicles({
      plateNo: "", 
      vehicleMakeModelId: "",
      details: "",
      vehicleStatusId: "",
    })
    setIsEditingCustomerVehicles(true);
  }

  const handleEditCustomerVehicles = async (customerVehicle) => {
    setNewCustomerVehicles(prev => ({
        ...prev,
        ...customerVehicle,
        makeModelId: Number(customerVehicle.makeModelId), 
        makeModel: makeModels.find(m => m.id === Number(customerVehicle.makeModelId))?.name || "Loading...",
        vehicleStatusId: Number(customerVehicle.vehicleStatusId), 
        vehicleStatus: vehicleStatuses.find(v => v.id === Number(customerVehicle.vehicleStatusId))?.name || "Loading...",
    }));

    try {
      const makeModelData = await fetchDropdownTypeList(10, customerVehicle.makeModelId);
      const makeModel = makeModelData?.[0]?.name || "Unknown";

      const vehicleStatusData = await fetchDropdownTypeList(11, customerVehicle.vehicleStatusId);
      const vehicleStatus = vehicleStatusData?.[0]?.name || "Unknown";

      setNewCustomerVehicles(prev => ({
          ...prev,
          makeModel,
          vehicleStatus,
      }));
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    setIsEditingCustomerVehicles(true);
  };

  const handleSaveCustomerVehicles = async () => {
    // Temporary Vehicle 
    try {
      let updatedVehicles = [...customerVehicles];

      if (newCustomerVehicles.id) {
        const existingVehicle = updatedVehicles.find(v => v.id === newCustomerVehicles.id);
        
        let makeModelName = existingVehicle?.makeModel || "Unknown"; 

        if (existingVehicle?.makeModelId !== newCustomerVehicles.makeModelId) {

          const makeModelData = await fetchDropdownTypeList(6, newCustomerVehicles.makeModelId);
          makeModelName = makeModelData?.[0]?.name || "Unknown";
        }

        updatedVehicles = updatedVehicles.map(contact =>
          contact.id === newCustomerVehicles.id
            ? { ...newCustomerVehicles, 
              makeModel: makeModelName,
              contactno2: newCustomerVehicles.contactNo2
              
            }
            : contact
        );
      } else {
        const tempId = `temp-${Date.now()}`;
        const makeModelData = await fetchDropdownTypeList(6, newCustomerVehicles.makeModelId);
        const makeModelName = makeModelData?.[0]?.name || "Unknown";

        const newVehicle = { 
          ...newCustomerVehicles, 
          id: tempId, 
          makeModelId: parseInt(newCustomerVehicles.makeModelId, 10),
          makeModel: makeModelName,
          contactno2: newCustomerVehicles.contactNo2
        };

        updatedVehicles = [...updatedVehicles, newVehicle];
      }

      setCustomerVehicles(updatedVehicles);
      setIsEditingCustomerVehicles(false);
      setNotification({ message: "Save successful (temporary)", type: "success" });

    } catch (error) {
      setNotification({ message: "Error saving data", type: "error" });
      console.error("Error saving data:", error);
    }
  };

  const handleDeleteCustomerVehicles = (id) => {
    const handleConfirm = () => {
        try {
            setIsEditingCustomerVehicles(false);
            setNotification({ message: "Temporary record deleted successfully!", type: "success" });

            setCustomerVehicles((prevCustomerVehicles) => 
                prevCustomerVehicles.filter(customerVehicle => customerVehicle.id !== id)
            );
        } catch (error) {
            setNotification({ message: "Failed to delete temporary record.", type: "error" });
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

  const customerVehiclesColumns = [
    { key: "id", label: "No.", hidden: true },
    { key: "plateNo", label: "Plate No.", hidden: false },
    { key: "makeModel", label: "Make and Model", hidden: false }, 
    { key: "details", label: "Details", hidden: true },
    { key: "vehicleStatus", label: "Status", hidden: false } 
  ];

  const customRenderCustomerVehicles = {
    actions: (item) => (
      <button
        onClick={() => handleEditCustomerVehicles(item)} 
        className="px-3 py-1 bg-blue-200 text-blue-800 rounded hover:bg-blue-300"
      >
        Edit
      </button>
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
      {isLoadingCustomers ? (
        // <p>Loading...</p>
        <TableSkeleton columns={4} rows={5}/>
      ) : isEditing ? (
        <>
        <Accordion variant="splitted" defaultExpandedKeys={["customer_info"]}>
          <AccordionItem key="customer_info" aria-label="Customer Information" title="Customer Information">
            <div className="grid grid-cols-12 gap-3 mb-4">
              <div className="col-span-2 gap-3">
                <Input 
                  className="w-full mb-2" 
                  label="Customer Code" 
                  placeholder="Enter customer code" 
                  value={newCustomer.code}
                  onChange={(e) => setNewCustomer({ ...newCustomer, code: e.target.value })}
                  disabled
                  isRequired
                />
              </div>
              <div className="col-span-4 gap-3">
                <Input 
                  className="w-full mb-2" 
                  label="Customer Name" 
                  placeholder="Enter name" 
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  isRequired
                />
              </div>
              <div className="col-span-2 gap-3">
                <Input 
                  className="w-full mb-2" 
                  label="TIN" 
                  placeholder="Enter TIN" 
                  value={newCustomer.tin}
                  onChange={(e) => setNewCustomer({ ...newCustomer, tin: e.target.value })}
                  isRequired
                />
              </div>
              <div className="col-span-4 gap-3">
                <MultiDropdown 
                  label="Station"
                  customOptions={stations.map(s => ({
                    id: s.id,
                    name: s.name
                  }))}
                  isMultiline
                  value={newCustomer.stationId || []} 
                  onChange={(e) => setNewCustomer({ 
                    ...newCustomer, 
                    stationId: e.target.value.map(id => parseInt(id, 10)) 
                  })} 
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-3 mb-4">
              <div className="col-span-3 gap-3">
                <Input 
                  className="w-full mb-2" 
                  label="Billing Address: Street" 
                  placeholder="Enter Billing Address" 
                  value={newCustomer.billingAddress}
                  onChange={(e) => setNewCustomer({ ...newCustomer, billingAddress: e.target.value })}
                  isRequired
                />
              </div>
              <div className="col-span-3 gap-3">
                <Dropdown 
                  label="Province"
                  typeId={14} 
                  value={newCustomer.provinceId} 
                  onChange={(e) => setNewCustomer({ ...newCustomer, provinceId: e.target.value })} 
                />
              </div>
              <div className="col-span-3 gap-3">
                <Dropdown 
                  label="City"
                  typeId={15} 
                  value={newCustomer.cityId} 
                  onChange={(e) => setNewCustomer({ ...newCustomer, cityId: e.target.value })} 
                />
              </div>
              <div className="col-span-3 gap-3">
                <Dropdown 
                  label="Barangay"
                  typeId={16} 
                  value={newCustomer.barangayId} 
                  onChange={(e) => setNewCustomer({ ...newCustomer, barangayId: e.target.value })} 
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-3 mb-4">
              <div className="col-span-2 gap-3">
                <Input 
                  className="w-full mb-2" 
                  label="Contact No." 
                  placeholder="Enter Contact No." 
                  value={newCustomer.contactNo}
                  onChange={(e) => setNewCustomer({ ...newCustomer, contactNo: e.target.value })}
                  isRequired
                />
              </div>
              <div className="col-span-4 gap-3">
                <Input 
                  className="w-full mb-2" 
                  label="Email" 
                  placeholder="Enter email" 
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  isRequired
                />
              </div>
              <div className="col-span-3 gap-3">
                <Dropdown 
                  label="Tax Code"
                  typeId={9} 
                  value={newCustomer.taxCodeId} 
                  onChange={(e) => setNewCustomer({ ...newCustomer, taxCodeId: e.target.value })} 
                />
              </div>
              <div className="col-span-3 gap-3">
                <Dropdown 
                  label="Customer Status"
                  typeId={8} 
                  value={newCustomer.customerStatusId} 
                  onChange={(e) => setNewCustomer({ ...newCustomer, customerStatusId: e.target.value })} 
                />
              </div>
            </div>
          </AccordionItem>
          <AccordionItem key="contact_persons" aria-label="Contact Persons" title="Contact Persons">
            {loadingCustomerContacts ? (
              <TableSkeleton columns={4} rows={5}/>
            ) : isEditingCustomerContacts ? (
              <div className="h-screen flex justify-center items-center">
                <div className="bg-white p-6 w-96 h-full max-w-lg">
                  <h2 className="text-xl font-semibold mb-4">{newCustomerContacts.id ? "Edit" : "Add"} new</h2>
                  <Input 
                    className="w-full mb-2" 
                    label="Name" 
                    placeholder="Enter name" 
                    value={newCustomerContacts.name}
                    onChange={(e) => setNewCustomerContacts({ ...newCustomerContacts, name: e.target.value })}
                    isRequired
                  />
                  <Input 
                    className="w-full mb-2" 
                    label="Contact No." 
                    placeholder="Enter contact no." 
                    value={newCustomerContacts.contactNo2}
                    onChange={(e) => setNewCustomerContacts({ ...newCustomerContacts, contactNo2: e.target.value })}
                    isRequired
                  />
                  <Textarea 
                    className="w-full mb-2" 
                    label="Details" 
                    placeholder="Enter Details" 
                    value={newCustomerContacts.details}
                    onChange={(e) => setNewCustomerContacts({ ...newCustomerContacts, details: e.target.value })}
                    isRequired
                  />
                  <div className="flex justify-between items-center w-full mt-2">
                    {newCustomerContacts.id ? (
                      <Button onClick={() => handleDeleteCustomerContacts(newCustomerContacts.id)} color="danger">Delete</Button>
                    ) : (
                      <div></div> 
                    )}
                    <div className="flex space-x-2">
                      <Button onClick={() => setIsEditingCustomerContacts(false)} color="default" className="text-[blue]">Close</Button>
                      <Button 
                        onClick={handleSaveCustomerContacts} 
                        disabled={isSaving} 
                        color="primary"
                      >
                        {isSaving ? "Saving..." : "Save"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Table 
                data={customerContacts} 
                columns={customerContactsColumns} 
                onEdit={handleEditCustomerContacts} 
                onAdd={handleAddCustomerContacts} 
                customRender={customRenderCustomerContacts} 
              />
            )}
          </AccordionItem>
          <AccordionItem key="vehicles" aria-label="Vehicles" title="Vehicles">
            {loadingCustomerVehicles ? (
              <TableSkeleton columns={4} rows={5}/>
            ) : isEditingCustomerVehicles ? (
              <div className="h-screen flex justify-center items-center">
                <div className="bg-white p-6 w-96 h-full max-w-lg">
                  <h2 className="text-xl font-semibold mb-4">{newCustomerVehicles.id ? "Edit" : "Add"} new</h2>
                  <Input 
                    className="w-full mb-2" 
                    label="Plate No." 
                    placeholder="Enter plate no." 
                    value={newCustomerVehicles.plateNo}
                    onChange={(e) => setNewCustomerVehicles({ ...newCustomerVehicles, plateNo: e.target.value })}
                    isRequired
                  />
                  <Dropdown 
                    label="Vehicle Make and Model"
                    typeId={10} 
                    value={newCustomerVehicles.makeModelId} 
                    onChange={(e) => setNewCustomerVehicles({ ...newCustomerVehicles, makeModelId: e.target.value })} 
                  />
                  <Textarea 
                    className="w-full mb-2" 
                    label="Details" 
                    placeholder="Enter Details" 
                    value={newCustomerVehicles.details}
                    onChange={(e) => setNewCustomerVehicles({ ...newCustomerVehicles, details: e.target.value })}
                    isRequired
                  />
                  <Dropdown 
                    label="Customer Status"
                    typeId={11} 
                    value={newCustomerVehicles.vehicleStatusId} 
                    onChange={(e) => setNewCustomerVehicles({ ...newCustomerVehicles, vehicleStatusId: e.target.value })} 
                  />
                  <div className="flex justify-between items-center w-full mt-2">
                    {newCustomerVehicles.id ? (
                      <Button onClick={() => handleDeleteCustomerVehicles(newCustomerVehicles.id)} color="danger">Delete</Button>
                    ) : (
                      <div></div> 
                    )}
                    <div className="flex space-x-2">
                      <Button onClick={() => setIsEditingCustomerVehicles(false)} color="default" className="text-[blue]">Close</Button>
                      <Button 
                        onClick={handleSaveCustomerVehicles} 
                        // disabled={isSaving} 
                        color="primary"
                      >
                        {/* {isSaving ? "Saving..." : "Save"} */}
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Table 
                data={customerVehicles} 
                columns={customerVehiclesColumns} 
                onEdit={handleEditCustomerVehicles} 
                onAdd={handleAddCustomerVehicles} 
                customRender={customRenderCustomerVehicles} 
              />
            )}
          </AccordionItem>
        </Accordion>
        <div className="flex items-center justify-between p-4">
          <Button color="primary" variant="solid" className="w-min rounded-md font-semibold text-base text-white">
            + Attachments
          </Button>
          <div className="flex gap-2">
            <Button onClick={() => setIsEditing(false)} color="default" className="w-min rounded-md font-semibold text-base text-white">
                Back
            </Button>
            {newCustomer.id ? (
              <Button onClick={() => handleDelete(newCustomer.id)} color="danger" className="w-min rounded-md font-semibold text-base text-white">
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
        <Table 
          title="Customers" 
          data={customers} 
          columns={columns} 
          onEdit={handleEdit} 
          onAdd={handleAdd} 
          customRender={customRender} 
        />
      )}
    </div>
  );  
};

export default Customer;
