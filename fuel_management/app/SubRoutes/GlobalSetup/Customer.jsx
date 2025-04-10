import React, { useEffect, useState } from "react";
import Table from "~/Components/Table";
// import Dropdown from "~/Components/Dropdown";
import Notification from "~/Components/Notification";
import TableSkeleton from "~/Components/TableSkeleton";
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
  DatePicker
} from "@heroui/react";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [notification, setNotification] = useState(null);
  const [image, setImage] = useState(null);
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));
  // const [selectedValue, setSelectedValue] = useState(null);
  const [newCustomer, setNewCustomer] = useState({  
    name: "", 
    startTime: "00:00",
    endTime: "00:00",
    details: "", 
    status: true
  });

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
    [selectedKeys],
  );

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
      name: "", 
      startTime: "00:00",
      endTime: "00:00", 
      details: "", 
      status: true
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
    if (!newCustomer.name || !newCustomer.startTime || !newCustomer.endTime || !newCustomer.details) {
        setNotification({ message: "All fields are required.", type: "error" });
        return;
    }

    try {
        if (newCustomer.id) {
            await updateCustomer(newCustomer.id, newCustomer);
        } else {
            const response = await createCustomer(newCustomer);
            setCustomers([...customers, response[0]]); 
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

  const provinces = [
    {key: "cavite", label: "Cavite"},
    {key: "batangas", label: "Batangas"},
    {key: "laguna", label: "Laguna"},
    {key: "rizal", label: "Rizal"},
    {key: "quezon_province", label: "Quezon Province"}
  ];

  const cities = [
    {key: "calamba", label: "Calamba"},
    {key: "cabuyao", label: "Cabuyao"},
    {key: "santa_rosa", label: "Santa Rosa"},
    {key: "binan", label: "Binan"},
    {key: "san_pedro", label: "San Pedro"}
  ];

  const barangays = [
    {key: "san_cristobal", label: "San Cristobal"},
    {key: "pulo", label: "Pulo"},
    {key: "san_lorenzo", label: "San Lorenzo"},
    {key: "soro_soro", label: "Soro-Soro"},
    {key: "landayan", label: "Landayan"}
  ];

  const taxCodes = [
    {key: "s1", label: "S1"}
  ];

  const customerStatus = [
    {key: "true", label: "Active"},
    {key: "false", label: "Inactive"}
  ];

  const columns = [
    { key: "id", label: "No.", hidden: true },
    { key: "name", label: "Customer Name", hidden: false },
    { key: "startTime", label: "Start Time", hidden: false },
    { key: "endTime", label: "End Time", hidden: false },
    { key: "details", label: "Details", hidden: true },
    { 
      key: "status", 
      label: "Status",
      render: (customer) => {
        // console.log("Rendering status:", customer.status);
        return customer.status ? "Active" : "Inactive";
      },
      hidden: true
    }
  ];

  const contactPersonsColumns = [
    { key: "name", label: "Name", hidden: false },
    { key: "contact", label: "Contact No.", hidden: false },
    { key: "details", label: "Details", hidden: false }
  ];

  const vehiclesColumns = [
    { key: "plateNumber", label: "Plate No.", hidden: false },
    { key: "makeAndModel", label: "Make and Model", hidden: false },
    { key: "status", label: "Status", hidden: false }
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
                <Select
                  className="w-full"
                  items={provinces}
                  label="Province"
                  placeholder="Select a Province"
                >
                  {(provinces) => <SelectItem>{provinces.label}</SelectItem>}
                </Select>
              </div>
              <div className="col-span-2 gap-3">
                <Select
                  className="w-full"
                  items={cities}
                  label="City / Municipality"
                  placeholder="Select a City"
                >
                  {(cities) => <SelectItem>{cities.label}</SelectItem>}
                </Select>
              </div>
              <div className="col-span-2 gap-3">
                <Select
                    className="w-full"
                    items={barangays}
                    label="Barangay"
                    placeholder="Select a Barangay"
                  >
                    {(barangays) => <SelectItem>{barangays.label}</SelectItem>}
                </Select>
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
                <Select
                    className="w-full"
                    items={taxCodes}
                    label="Tax Code"
                    placeholder="Select a Tax Code"
                  >
                    {(taxCodes) => <SelectItem>{taxCodes.label}</SelectItem>}
                </Select>
              </div>
              <div className="col-span-2 gap-3">
                <Select
                    className="w-full"
                    items={customerStatus}
                    label="Customer Status"
                    placeholder="Select a Status"
                  >
                    {(customerStatus) => <SelectItem>{customerStatus.label}</SelectItem>}
                </Select>
              </div>
            </div>
          </AccordionItem>
          <AccordionItem key="contact_persons" aria-label="Contact Persons" title="Contact Persons">
            <Table 
              // title="Emergency Contacts" 
              data={customers} 
              columns={contactPersonsColumns} 
              onEdit={handleEdit} 
              onAdd={handleAdd} 
              customRender={customRender} 
            />
          </AccordionItem>
          <AccordionItem key="vehicles" aria-label="Vehicles" title="Vehicles">
            <Table 
              // title="Emergency Contacts" 
              data={customers} 
              columns={vehiclesColumns} 
              onEdit={handleEdit} 
              onAdd={handleAdd} 
              customRender={customRender} 
            />
          </AccordionItem>
        </Accordion>
        {/* <div className="md:flex grid grid-cols-3 gap-4 mt-24 justify-end">
          <Button color="primary" className="w-min rounded-md font-semibold text-base text-white" isDisabled={true}>
              + Attachments
          </Button>
        </div> */}
        <div className="flex items-center justify-between p-4">
          <Button color="primary" variant="solid" className="w-min rounded-md font-semibold text-base text-white">
            + Attachments
          </Button>
          <div className="flex gap-2">
            <Button color="default" className="w-min rounded-md font-semibold text-base text-white">
                Back
            </Button>
            <Button color="danger" className="w-min rounded-md font-semibold text-base text-white">
                Delete
            </Button>
            <Button color="primary" className="w-min rounded-md font-semibold text-base text-white">
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
