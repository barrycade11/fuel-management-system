import React, { useEffect, useState } from "react";
import Table from "~/Components/Table";
import Dropdown from "~/Components/Dropdown";
import Notification from "~/Components/Notification";
import TableSkeleton from "~/Components/TableSkeleton";
import DropdownStatus from "~/Components/DropdownStatus";
import { 
  fetchCustomers, 
  fetchCustomerDetails, 
  createCustomer, 
  updateCustomer, 
  deleteCustomer  
} from "~/Hooks/Setup/GlobalRecords/Customer/useCustomers";
import {
  Select,
  SelectItem,
  Input,
  Button,
  Accordion, 
  AccordionItem,
  DatePicker,
  Textarea
} from "@heroui/react";
import { fetchCustomerContactPersons } from "~/Hooks/Setup/GlobalRecords/CustomerContactPerson/useCustomerContactPersons";
import { fetchDropdowns, fetchDropdownTypeList } from "~/Hooks/Setup/GlobalRecords/Dropdown/useDropdowns";

const Customer = () => {
  const [makeModels, setMakeModels] = useState([]); 
  const [vehicleStatuses, setVehicleStatus] = useState([]); 
  const [customers, setCustomers] = useState([]);
  const [customerContacts, setCustomerContacts] = useState([]);
  const [customerVehicles, setCustomerVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCustomerContacts, setLoadingCustomerContacts] = useState(true);
  const [loadingCustomerVehicles, setLoadingCustomerVehicles] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingCustomerContacts, setIsEditingCustomerContacts] = useState(false);
  const [isEditingCustomerVehicles, setIsEditingCustomerVehicles] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [notification, setNotification] = useState(null);
  const [newCustomer, setNewCustomer] = useState({  
    code: "", 
    name: "",
    tin: "",
    address: "", 
    provinceId: "",
    cityId: "",
    barangayId: "",
    contactNo: "", 
    email: "",  
    taxCode: "",  
    customerStatusId: "",  
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

  // Customers
  const getCustomers = async () => {
    setLoading(true);
    try {
        const data = await fetchCustomers();

        const formattedData = data.map(customer => ({
            ...customer,
            startTime: customer.starttime, 
            endTime: customer.endtime  
        }));

        setCustomers(formattedData);
        // console.log(formattedData);
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        setLoading(false);
    }
};
  useEffect(() => {
      getCustomers();
  }, []);

  const handleAdd = () => {
    setNewCustomer({ 
      code: "", 
      name: "",
      tin: "",
      address: "", 
      provinceId: "",
      cityId: "",
      barangayId: "",
      contactNo: "", 
      email: "",  
      taxCode: "",  
      customerStatusId: ""
    });
    setIsEditing(true);
  };

  const handleEdit = async (customer) => {
    try {
        setNewCustomer((prev) => ({
          ...prev,
          ...customer
        }));

        setIsEditing(true);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
  };

  const handleSave = async () => {
    // if (!newCustomer.name || !newCustomer.startTime || !newCustomer.endTime || !newCustomer.details) {
    //     setNotification({ message: "All fields are required.", type: "error" });
    //     return;
    // }

    const formatDate = (dateObj) => {
      if (!dateObj || !dateObj.year || !dateObj.month || !dateObj.day) return null;
      return `${dateObj.year}-${String(dateObj.month).padStart(2, "0")}-${String(dateObj.day).padStart(2, "0")}`;
    };

    const payload = {
      code: newEmployee.code, 
      firstName: newEmployee.firstName,
      middleName: newEmployee.middleName,
      lastName: newEmployee.lastName,
      birthDate: formatDate(newEmployee.birthDate),
      age: parseInt(newEmployee.age, 10), 
      genderId: parseInt(newEmployee.genderId, 10), 
      civilStatusId: parseInt(newEmployee.civilStatusId, 10),
      address: newEmployee.address, 
      provinceId: parseInt(newEmployee.provinceId, 10),
      cityId: parseInt(newEmployee.cityId, 10),
      barangayId: parseInt(newEmployee.barangayId, 10),
      dateHired: formatDate(newEmployee.dateHired), 
      // stationId: parseInt(newEmployee.stationId, 10),
      stationId: parseInt(2, 10),
      departmentId: parseInt(2, 10),
      // departmentId: parseInt(newEmployee.departmentId, 10),
      designationId: parseInt(newEmployee.designationId, 10),
      employeeStatusId: parseInt(newEmployee.employeeStatusId, 10),
      contactNo: newEmployee.contactNo,
      email: newEmployee.email
    };

    console.log(payload)

    try {
        let customerId;

        if (newCustomer.id) {
            await updateCustomer(newCustomer.id, newCustomer);
        } else {
            const response = await createCustomer(newCustomer);
            customerId = response.id; 
            setCustomers([...customers, response[0]]); 
        }

        if (customerId) {
          await createCustomerContact(customerId, customerContacts);
          await createCustomerVehicle(customerId, customerVehicles);
        }


        setIsEditing(false);
        setNotification({ message: "Save successful", type: "success" });

        getCustomers(); 
    } catch (error) {
        setNotification({ message: "Error saving data", type: "error" });
        console.error("Error saving data:", error);
    }
  };

  const handleDelete = (id) => {
    const handleConfirm = async () => {
        try {
            await deleteCustomer(id);

            setIsEditing(false);
            setNotification({ message: "Record deleted successfully!", type: "success" });
            getCustomers(); 
            setCustomers((prevCustomers) => prevCustomers.filter(customer => customer.id !== id)); 
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
    { key: "contactPerson", label: "Contact Person", hidden: true }
  ];

  const customRender = {
    actions: (item) => (
      <button
        onClick={() => handleEdit(item)} 
        className="px-3 py-1 bg-blue-200 text-blue-800 rounded hover:bg-blue-300"
      >
        Edit
      </button>
    ),
  };

  // Customer Contacts 
  const getCustomerContacts = async () => {
    setLoadingCustomerContacts(true);
    try {
      const data = await fetchCustomerContactPersons(customers.id);

    } catch {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingCustomerContacts(false);
    }
  }

  useEffect(() => {
    getCustomerContacts();
  }, []);

  const handleAddCustomerContacts = () => {
    setNewCustomerContacts({
      name: "", 
      contactNo: "",
      details: "",
    })
    setIsEditingCustomerContacts(true);
  }

  const handleEditCustomerContacts = async (customerContact) => {
    try {
        setNewCustomerContacts((prev) => ({
            ...prev,
            ...customerContact
        }));
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    setIsEditingCustomerContacts(true);
  };

  const handleSaveCustomerContacts = async () => {
    try {
        let updatedContacts = [...customerContacts];

        if (newCustomerContacts.id) {
            // Update existing contact
            updatedContacts = updatedContacts.map(contact =>
                contact.id === newCustomerContacts.id ? { ...contact, ...newCustomerContacts } : contact
            );
        } else {
            // Add new contact
            const tempId = `temp-${Date.now()}`;
            const newContact = { 
                ...newCustomerContacts, 
                id: tempId
            };
            updatedContacts = [...updatedContacts, newContact];
        }

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
    { key: "contactNo", label: "Contact No.", hidden: false }, 
    { key: "details", label: "Details", hidden: true },
  ];

  const customRenderCustomerContacts = {
    actions: (item) => (
      <button
        onClick={() => handleEditCustomerContacts(item)} 
        className="px-3 py-1 bg-blue-200 text-blue-800 rounded hover:bg-blue-300"
      >
        Edit
      </button>
    ),
  };


  // Customer Vehicles 
  const getMakeModels = async () => {
    try {
      const response = await fetchDropdowns(10); 
      setMakeModels(response); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getVehicleStatus = async () => {
    try {
      const response = await fetchDropdowns(11); 
      setVehicleStatus(response); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getCustomerVehicles = async () => {
    setLoadingCustomerVehicles(true);
    try {
      const data = await fetchCustomerVehicle(customers.id);

    } catch {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingCustomerVehicles(false);
    }
  }

  useEffect(() => {
    getMakeModels();
  }, []);

  useEffect(() => {
    getVehicleStatus();
  }, []);

  useEffect(() => {
    if (makeModels.length > 0) {
      getCustomerVehicles(); 
    }
  }, [makeModels]);

  useEffect(() => {
    if (vehicleStatuses.length > 0) {
      getCustomerVehicles(); 
    }
  }, [vehicleStatuses]);

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
        status: vehicleStatuses.find(v => v.id === Number(customerVehicle.vehicleStatusId))?.name || "Loading...",
    }));

    try {
      const makeModelData = await fetchDropdownTypeList(10, customerVehicle.makeModelId);
      console.log(makeModelData)
      const makeModel = makeModelData?.[0]?.name || "Unknown";

      const vehicleStatusData = await fetchDropdownTypeList(11, customerVehicle.vehicleStatusId);
      console.log(vehicleStatusData)
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
    try {
      let updatedVehicles = [...customerVehicles];
  
      // Declare variables at the start to avoid reference errors
      let makeModelName = "Unknown";
      let vehicleStatusName = "Unknown";
  
      if (newCustomerVehicles.id) {
        const existingVehicle = updatedVehicles.find(c => c.id === newCustomerVehicles.id);
        makeModelName = existingVehicle?.makeModel || "Unknown";
        vehicleStatusName = existingVehicle?.vehicleStatus || "Unknown";
  
        if (existingVehicle?.makeModelId !== newCustomerVehicles.makeModelId) {
          const makeModelData = await fetchDropdownTypeList(10, newCustomerVehicles.makeModelId);
          makeModelName = makeModelData?.[0]?.name || "Unknown";
        }
  
        updatedVehicles = updatedVehicles.map(makeModel =>
          makeModel.id === newCustomerVehicles.id
            ? { ...newCustomerVehicles, makeModel: makeModelName }
            : makeModel
        );
  
        if (existingVehicle?.vehicleStatusId !== newCustomerVehicles.vehicleStatusId) {
          const vehicleStatusData = await fetchDropdownTypeList(11, newCustomerVehicles.vehicleStatusId);
          vehicleStatusName = vehicleStatusData?.[0]?.name || "Unknown";
        }
  
        updatedVehicles = updatedVehicles.map(vehicleStatus =>
          vehicleStatus.id === newCustomerVehicles.id
            ? { ...newCustomerVehicles, vehicleStatus: vehicleStatusName }
            : vehicleStatus
        );
      } else {
        const tempId = `temp-${Date.now()}`;
  
        // Fetch names for new entries
        const makeModelData = await fetchDropdownTypeList(10, newCustomerVehicles.makeModelId);
        makeModelName = makeModelData?.[0]?.name || "Unknown";
  
        const vehicleStatusData = await fetchDropdownTypeList(11, newCustomerVehicles.vehicleStatusId);
        vehicleStatusName = vehicleStatusData?.[0]?.name || "Unknown";
  
        const newVehicle = {
          ...newCustomerVehicles,
          id: tempId,
          makeModelId: parseInt(newCustomerVehicles.makeModelId, 10),
          makeModel: makeModelName,
          vehicleStatusId: parseInt(newCustomerVehicles.vehicleStatusId, 10),
          vehicleStatus: vehicleStatusName,
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
      {loading ? (
        // <p>Loading...</p>
        <TableSkeleton columns={4} rows={5}/>
      ) : isEditing ? (
        <>
        <Accordion variant="splitted" defaultExpandedKeys={["customer_info"]}>
          <AccordionItem key="customer_info" aria-label="Customer Information" title="Customer Information">
            <div className="grid grid-cols-12 gap-3 mb-4">
              <div className="col-span-2 gap-3">
                <Input label="Customer Code" value="CUS-00001" disabled />
              </div>
              <div className="col-span-6 gap-3">
                <Input label="Customer Name" placeholder="Enter Name" />
              </div>
              <div className="col-span-4 gap-3">
                <Input label="TIN" placeholder="Enter TIN" />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-3 mb-4">
              <div className="col-span-5 gap-3">
                <Input label="Billing Address: Street" placeholder="Enter Billing Address" />
              </div>
              <div className="col-span-3 gap-3">
                <Dropdown 
                  label="Province"
                  typeId={14} 
                  value={newCustomer.province} 
                  onChange={(e) => setNewCustomer({ ...newCustomer, province: e.target.value })} 
                />
              </div>
              <div className="col-span-2 gap-3">
                <Dropdown 
                  label="City"
                  typeId={15} 
                  value={newCustomer.city} 
                  onChange={(e) => setNewCustomer({ ...newCustomer, city: e.target.value })} 
                />
              </div>
              <div className="col-span-2 gap-3">
                <Dropdown 
                  label="Barangay"
                  typeId={16} 
                  value={newCustomer.barangay} 
                  onChange={(e) => setNewCustomer({ ...newCustomer, barangay: e.target.value })} 
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-3 mb-4">
              <div className="col-span-3 gap-3">
                <Input label="Contact No." placeholder="Enter Contact No." />
              </div>
              <div className="col-span-5 gap-3">
                <Input label="Email" placeholder="Enter Email" />
              </div>
              <div className="col-span-2 gap-3">
              <Dropdown 
                  label="Tax Code"
                  typeId={9} 
                  value={newCustomer.taxCode} 
                  onChange={(e) => setNewCustomer({ ...newCustomer, taxCode: e.target.value })} 
                />
              </div>
              <div className="col-span-2 gap-3">
                <DropdownStatus
                  className="w-full mb-2"
                  value={Boolean(newCustomer.status)} 
                  onChange={(val) => setNewCustomer({ ...newCustomer, status: val })} 
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
                    value={newCustomerContacts.contactNo}
                    onChange={(e) => setNewCustomerContacts({ ...newCustomerContacts, contactNo: e.target.value })}
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
                    label="Status"
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
            <Button onClick={handleSave} color="primary" className="w-min rounded-md font-semibold text-base text-white">
                Save
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
