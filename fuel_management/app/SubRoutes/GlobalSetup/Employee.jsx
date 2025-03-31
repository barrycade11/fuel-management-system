import React, { useEffect, useState } from "react";
import Table from "~/Components/Table";
// import Dropdown from "~/Components/Dropdown";
import Notification from "~/Components/Notification";
import TableSkeleton from "~/Components/TableSkeleton";
import { 
  fetchEmployees, 
  fetchEmployeeDetails, 
  createEmployee, 
  updateEmployee, 
  deleteEmployee  
} from "~/Hooks/Setup/GlobalRecords/Employee/useEmployees";
import {
  Select,
  SelectItem, 
  Input,
  Button,
  Accordion, 
  AccordionItem,
  DatePicker
} from "@heroui/react";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [notification, setNotification] = useState(null);
  const [image, setImage] = useState(null);
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));
  // const [selectedValue, setSelectedValue] = useState(null);
  const [newEmployee, setNewEmployee] = useState({  
    code: "", 
    name: "",
    department: "",
    designation: "", 
    status: true
  });

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
    [selectedKeys],
  );

  const getEmployees = async () => {
    setLoading(true);
    try {
        const data = await fetchEmployees();

        const formattedData = data.map(employee => ({
            ...employee,
            startTime: employee.starttime, 
            endTime: employee.endtime  
        }));

        setEmployees(formattedData);
        // console.log(formattedData);
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        setLoading(false);
    }
};
  useEffect(() => {
      getEmployees();
  }, []);

  const handleAdd = () => {
    setNewEmployee({ 
      code: "", 
      name: "",
      department: "",
      designation: "", 
      status: true
    });
    setIsEditing(true);
  };

  const handleEdit = async (employee) => {
    try {
        setNewEmployee((prev) => ({
          ...prev,
          ...employee
        }));

        setIsEditing(true);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
  };

  const handleSave = async () => {
    if (!newEmployee.name || !newEmployee.startTime || !newEmployee.endTime || !newEmployee.details) {
        setNotification({ message: "All fields are required.", type: "error" });
        return;
    }

    try {
        if (newEmployee.id) {
            await updateEmployee(newEmployee.id, newEmployee);
        } else {
            const response = await createEmployee(newEmployee);
            setEmployees([...employees, response[0]]); 
        }

        setIsEditing(false);
        setNotification({ message: "Save successful", type: "success" });

        getEmployees(); 
    } catch (error) {
        setNotification({ message: "Error saving data", type: "error" });
        console.error("Error saving data:", error);
    }
  };

  const handleDelete = (id) => {
    const handleConfirm = async () => {
        try {
            await deleteEmployee(id);

            setIsEditing(false);
            setNotification({ message: "Record deleted successfully!", type: "success" });
            getEmployees(); 
            setEmployees((prevEmployees) => prevEmployees.filter(employee => employee.id !== id)); 
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const genders = [
    {key: "male", label: "Male"},
    {key: "female", label: "Female"}
  ];

  const civilStatus = [
    {key: "single", label: "Single"},
    {key: "married", label: "Married"},
    {key: "widowed", label: "Widowed"}
  ];

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

  const stations = [
    {key: "shbalibago", label: "SH Balibago"},
    {key: "shnuvali", label: "SH Nuvali"}
  ];

  const departments = [
    {key: "shop", label: "Shop"}
  ];

  const designations = [
    {key: "manager", label: "Manager"},
    {key: "staff", label: "Staff"}
  ];

  const employeeStatus = [
    {key: "true", label: "Active"},
    {key: "false", label: "Inactive"}
  ];

  const taxCodes = [
    {key: "s1", label: "S1"}
  ];

  const columns = [
    { key: "id", label: "No.", hidden: true },
    { key: "code", label: "Employee Code", hidden: false },
    { key: "name", label: "Employee Name", hidden: false },
    { key: "department", label: "Department", hidden: false },
    { key: "designation", label: "Designation", hidden: false },
    { 
      key: "status", 
      label: "Status",
      render: (employee) => {
        // console.log("Rendering status:", employee.status);
        return employee.status ? "Active" : "Inactive";
      },
      hidden: true
    }
  ];

  const emergencyContactsColumns = [
    { key: "relationship", label: "Relationship to Employee", hidden: false },
    { key: "name", label: "Name", hidden: false },
    { key: "contact", label: "Contact No.", hidden: false }
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
        <TableSkeleton columns={5} rows={5}/>
      ) : isEditing ? (
        <>
        <Accordion variant="splitted" defaultExpandedKeys={["personal_info"]}>
          <AccordionItem key="personal_info" aria-label="Personal Information" title="Personal Information">
            <div className="grid grid-cols-11 gap-3 mb-4">
              <div className="col-span-2 row-span-2 flex flex-col items-center gap-1">
                <div className="w-24 h-24 bg-gray-200 flex items-center justify-center overflow-hidden">
                  {image ? (
                    <img src={image} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-500 text-sm">No Image</span>
                  )}
                </div>
                <Input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="upload" />
                <label
                  htmlFor="upload"
                  className="px-3 py-1 bg-gray-100 text-[blue] rounded cursor-pointer text-sm"
                >
                  Select image...
                </label>
                
              </div>
                <div className="col-span-2 gap-3">
                  <Input label="Employee Code" value="EMP-00001" disabled />
                </div>
                <div className="col-span-3 gap-3">
                  <Input label="First Name" placeholder="Enter first name" />
                </div>
                <div className="col-span-2 gap-3">
                  <Input label="Middle Name" placeholder="Enter middle name" />
                </div>
                <div className="col-span-2 gap-3">
                  <Input label="Last Name" placeholder="Enter last name" />
                </div>

                <div className="col-span-3 gap-3">
                  <DatePicker className="max-w-[284px]" label="Date of Birth" />
                </div>
                <div className="col-span-2 gap-3">
                  <Input label="Age" placeholder="Enter age" />
                </div>
                <div className="col-span-2 gap-3">
                  <Select
                    className="w-full"
                    items={genders}
                    label="Gender"
                    placeholder="Select a Gender"
                  >
                    {(genders) => <SelectItem>{genders.label}</SelectItem>}
                  </Select>
                </div>
                <div className="col-span-2 gap-3">
                  <Select
                    className="w-full"
                    items={civilStatus}
                    label="Civil Status"
                    placeholder="Select a Status"
                  >
                    {(civilStatus) => <SelectItem>{civilStatus.label}</SelectItem>}
                  </Select>
                </div>
            </div>

            <div className="grid grid-cols-11 gap-3 mb-4">
              <div className="col-span-5 gap-3">
                <Input label="Current Address (Unit/Street #)" placeholder="Enter address" />
              </div>
              <div className="col-span-2 gap-3">
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

            <div className="grid grid-cols-11 gap-3 mb-4">
              <div className="col-span-5 flex gap-3">
                <DatePicker className="max-w-[284px]" label="Date Hired" />
                <Select
                  className="w-full"
                  items={stations}
                  label="Station"
                  placeholder="Select a Station"
                >
                  {(stations) => <SelectItem>{stations.label}</SelectItem>}
                </Select>
              </div>
              <div className="col-span-2 gap-3">
                <Select
                  className="w-full"
                  items={departments}
                  label="Department"
                  placeholder="Select a Department"
                >
                  {(departments) => <SelectItem>{departments.label}</SelectItem>}
                </Select>
              </div>
              <div className="col-span-2 gap-3">
                <Select
                  className="w-full"
                  items={designations}
                  label="Designation"
                  placeholder="Select a Designation"
                >
                  {(designations) => <SelectItem>{designations.label}</SelectItem>}
                </Select>
              </div>
              <div className="col-span-2 gap-3">
                <Select
                  className="w-full"
                  items={provinces}
                  label="Province"
                  placeholder="Select a Province"
                >
                  {(provinces) => <SelectItem>{provinces.label}</SelectItem>}
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-11 gap-3 mb-4">
              <div className="col-span-2 gap-3">
                <Input label="Contact No." placeholder="Enter Contact No." />
              </div>
              <div className="col-span-5 gap-3">
                <Input label="Email" placeholder="Enter email" />
              </div>
              <div></div>
            </div>
          </AccordionItem>
          <AccordionItem key="emergency_contacts" aria-label="Emergency Contacts" title="Emergency Contacts">
            <Table 
              // title="Emergency Contacts" 
              data={employees} 
              columns={emergencyContactsColumns} 
              onEdit={handleEdit} 
              onAdd={handleAdd} 
              customRender={customRender} 
            />
          </AccordionItem>
          <AccordionItem key="incentive_log" aria-label="Incentive Log" title="Incentive Log">
            {/* {defaultContent} */}
          </AccordionItem>
        </Accordion>
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
          title="Employees" 
          data={employees} 
          columns={columns} 
          onEdit={handleEdit} 
          onAdd={handleAdd} 
          customRender={customRender} 
        />
      )}
    </div>
  );  
};

export default Employee;
