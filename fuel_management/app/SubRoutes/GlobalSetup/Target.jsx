import React, { useEffect, useState } from "react";
import Table from "~/Components/Table";
// import Dropdown from "~/Components/Dropdown";
import Notification from "~/Components/Notification";
import TableSkeleton from "~/Components/TableSkeleton";
// import { 
//   fetchTargets, 
//   fetchTargetDetails, 
//   createTarget, 
//   updateTarget, 
//   deleteTarget  
// } from "~/Hooks/Setup/GlobalRecords/Target/useTargets";
import {
  Card,
  Select,
  SelectItem, 
  Input,
  Button,
  Accordion, 
  AccordionItem,
  DatePicker
} from "@heroui/react";

const Target = () => {
  const [targets, setTargets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [notification, setNotification] = useState(null);
  const [image, setImage] = useState(null);
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));
  // const [selectedValue, setSelectedValue] = useState(null);
  const [newTarget, setNewTarget] = useState({  
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

  const getTargets = async () => {
    setLoading(true);
    try {
        const data = await fetchTargets();

        const formattedData = data.map(target => ({
            ...target,
            startTime: target.starttime, 
            endTime: target.endtime  
        }));

        setTargets(formattedData);
        // console.log(formattedData);
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        setLoading(false);
    }
};
  useEffect(() => {
      getTargets();
  }, []);

  const handleAdd = () => {
    setNewTarget({ 
      name: "",
      targetField: "",
      station: "", 
      year: "", 
      status: true
    });
    setIsEditing(true);
  };

  const handleEdit = async (target) => {
    try {
        setNewTarget((prev) => ({
          ...prev,
          ...target
        }));

        setIsEditing(true);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
  };

  const handleSave = async () => {
    if (!newTarget.name || !newTarget.startTime || !newTarget.endTime || !newTarget.details) {
        setNotification({ message: "All fields are required.", type: "error" });
        return;
    }

    try {
        if (newTarget.id) {
            await updateTarget(newTarget.id, newTarget);
        } else {
            const response = await createTarget(newTarget);
            setTargets([...targets, response[0]]); 
        }

        setIsEditing(false);
        setNotification({ message: "Save successful", type: "success" });

        getTargets(); 
    } catch (error) {
        setNotification({ message: "Error saving data", type: "error" });
        console.error("Error saving data:", error);
    }
  };

  const handleDelete = (id) => {
    const handleConfirm = async () => {
        try {
            await deleteTarget(id);

            setIsEditing(false);
            setNotification({ message: "Record deleted successfully!", type: "success" });
            getTargets(); 
            setTargets((prevTargets) => prevTargets.filter(target => target.id !== id)); 
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

  const fuels = [
    {key: "vpr", label: "VPR Volume"},
    {key: "vpg", label: "VPG Volume"}
  ];

  const years = [
    {key: "2024", label: "2024"},
    {key: "2025", label: "2025"}
  ];

  const stations = [
    {key: "shbalibago", label: "SH Balibago"},
    {key: "shnuvali", label: "SH Nuvali"}
  ];

  const targetStatus = [
    {key: "true", label: "Active"},
    {key: "false", label: "Inactive"}
  ];

  const columns = [
    { key: "id", label: "No.", hidden: true },
    { key: "name", label: "Target Name", hidden: false },
    { key: "targetField", label: "Target Field", hidden: false },
    { key: "station", label: "Station", hidden: false },
    { key: "year", label: "Year", hidden: false },
    { 
      key: "status", 
      label: "Status",
      render: (target) => {
        // console.log("Rendering status:", target.status);
        return target.status ? "Active" : "Inactive";
      },
      hidden: true
    }
  ];

  const emergencyContactsColumns = [
    { key: "relationship", label: "Relationship to Target", hidden: false },
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
        <div className="grid grid-cols-10 gap-3 mb-4">
          <div className="col-span-4 gap-3">
            <Input label="Target Name" placeholder="Enter Target Name" />
          </div>
          <div className="col-span-2 gap-3">
            <Select
              className="w-full"
              items={years}
              label="Year"
              placeholder="Select a Year"
            >
              {(years) => <SelectItem>{years.label}</SelectItem>}
            </Select>
          </div>
          <div className="col-span-2 gap-3">
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
              items={targetStatus}
              label="Status"
              placeholder="Select a Status"
            >
              {(targetStatus) => <SelectItem>{targetStatus.label}</SelectItem>}
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-10 gap-3 mb-4">
          <div className="col-span-4 gap-3">
            <Select
              className="w-full"
              items={fuels}
              label="Target Field"
              placeholder="Select a Target Field"
            >
              {(fuels) => <SelectItem>{fuels.label}</SelectItem>}
            </Select>
          </div>
          <div className="col-span-3 gap-3">
            <h2 className="m-3 text-lg font-semibold ">Weekly Breakdown</h2>
          </div>
          <div className="col-span-2 gap-3">
          </div>
          <div className="col-span-1 gap-3">
          </div>
        </div>

        <div className="grid grid-cols-10 gap-3 mb-4">
          <div className="col-span-4 gap-3 mb-4">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Monthly Target Setting</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-1 gap-3">
                <Input label="January" placeholder="Enter Target" />
              </div>
              <div className="col-span-1 gap-3">
                <Input label="July" placeholder="Enter Target" />
              </div>
              <div className="col-span-1 gap-3">
                <Input label="February" placeholder="Enter Target" />
              </div>
              <div className="col-span-1 gap-3">
                <Input label="August" placeholder="Enter Target" />
              </div>
              <div className="col-span-1 gap-3">
                <Input label="March" placeholder="Enter Target" />
              </div>
              <div className="col-span-1 gap-3">
                <Input label="September" placeholder="Enter Target" />
              </div>
              <div className="col-span-1 gap-3">
                <Input label="April" placeholder="Enter Target" />
              </div>
              <div className="col-span-1 gap-3">
                <Input label="October" placeholder="Enter Target" />
              </div>
              <div className="col-span-1 gap-3">
                <Input label="May" placeholder="Enter Target" />
              </div>
              <div className="col-span-1 gap-3">
                <Input label="November" placeholder="Enter Target" />
              </div>
              <div className="col-span-1 gap-3">
                <Input label="June" placeholder="Enter Target" />
              </div>
              <div className="col-span-1 gap-3">
                <Input label="December" placeholder="Enter Target" />
              </div>
            </div>
          </Card>
          </div>

          <div className="grid col-span-4 gap-3 mb-4">
          <Accordion variant="splitted">
            <AccordionItem 
              key="Monday" 
              aria-label="Monday" 
              title={
                <div className="w-full flex justify-between items-center">
                  <span>Monday</span>
                  <span className="text-small text-default-500">10%</span>
                </div>
              }
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-1 gap-3">
                  <Input label="Full day % of week" placeholder="Enter %" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input label="Target Value" placeholder="Enter Amount" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input label="1st Shift" placeholder="Enter %" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input placeholder="Enter Amount" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input label="2nd Shift" placeholder="Enter %" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input placeholder="Enter Amount" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input label="3rd Shift" placeholder="Enter %" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input placeholder="Enter Amount" />
                </div>
              </div>
            </AccordionItem>
            <AccordionItem 
              key="Tuesday" 
              aria-label="Tuesday" 
              title={
                <div className="w-full flex justify-between items-center">
                  <span>Tuesday</span>
                  <span className="text-small text-default-500">10%</span>
                </div>
              }
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-1 gap-3">
                  <Input label="Full day % of week" placeholder="Enter %" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input label="Target Value" placeholder="Enter Amount" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input label="1st Shift" placeholder="Enter %" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input placeholder="Enter Amount" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input label="2nd Shift" placeholder="Enter %" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input placeholder="Enter Amount" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input label="3rd Shift" placeholder="Enter %" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input placeholder="Enter Amount" />
                </div>
              </div>
            </AccordionItem>
            <AccordionItem 
              key="Wednesday" 
              aria-label="Wednesday" 
              title={
                <div className="w-full flex justify-between items-center">
                  <span>Wednesday</span>
                  <span className="text-small text-default-500">10%</span>
                </div>
              }
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-1 gap-3">
                  <Input label="Full day % of week" placeholder="Enter %" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input label="Target Value" placeholder="Enter Amount" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input label="1st Shift" placeholder="Enter %" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input placeholder="Enter Amount" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input label="2nd Shift" placeholder="Enter %" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input placeholder="Enter Amount" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input label="3rd Shift" placeholder="Enter %" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input placeholder="Enter Amount" />
                </div>
              </div>
            </AccordionItem>
            <AccordionItem 
              key="Thursday" 
              aria-label="Thursday" 
              title={
                <div className="w-full flex justify-between items-center">
                  <span>Thursday</span>
                  <span className="text-small text-default-500">10%</span>
                </div>
              }
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-1 gap-3">
                  <Input label="Full day % of week" placeholder="Enter %" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input label="Target Value" placeholder="Enter Amount" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input label="1st Shift" placeholder="Enter %" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input placeholder="Enter Amount" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input label="2nd Shift" placeholder="Enter %" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input placeholder="Enter Amount" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input label="3rd Shift" placeholder="Enter %" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input placeholder="Enter Amount" />
                </div>
              </div>
            </AccordionItem>
            <AccordionItem 
              key="Friday" 
              aria-label="Friday" 
              title={
                <div className="w-full flex justify-between items-center">
                  <span>Friday</span>
                  <span className="text-small text-default-500">10%</span>
                </div>
              }
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-1 gap-3">
                  <Input label="Full day % of week" placeholder="Enter %" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input label="Target Value" placeholder="Enter Amount" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input label="1st Shift" placeholder="Enter %" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input placeholder="Enter Amount" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input label="2nd Shift" placeholder="Enter %" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input placeholder="Enter Amount" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input label="3rd Shift" placeholder="Enter %" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input placeholder="Enter Amount" />
                </div>
              </div>
            </AccordionItem>
            <AccordionItem 
              key="Saturday" 
              aria-label="Saturday" 
              title={
                <div className="w-full flex justify-between items-center">
                  <span>Saturday</span>
                  <span className="text-small text-default-500">10%</span>
                </div>
              }
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-1 gap-3">
                  <Input label="Full day % of week" placeholder="Enter %" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input label="Target Value" placeholder="Enter Amount" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input label="1st Shift" placeholder="Enter %" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input placeholder="Enter Amount" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input label="2nd Shift" placeholder="Enter %" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input placeholder="Enter Amount" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input label="3rd Shift" placeholder="Enter %" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input placeholder="Enter Amount" />
                </div>
              </div>
            </AccordionItem>
            <AccordionItem 
              key="Sunday" 
              aria-label="Sunday" 
              title={
                <div className="w-full flex justify-between items-center">
                  <span>Sunday</span>
                  <span className="text-small text-default-500">10%</span>
                </div>
              }
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-1 gap-3">
                  <Input label="Full day % of week" placeholder="Enter %" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input label="Target Value" placeholder="Enter Amount" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input label="1st Shift" placeholder="Enter %" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input placeholder="Enter Amount" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input label="2nd Shift" placeholder="Enter %" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input placeholder="Enter Amount" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input label="3rd Shift" placeholder="Enter %" />
                </div>
                <div className="col-span-1 gap-3">
                  <Input placeholder="Enter Amount" />
                </div>
              </div>
            </AccordionItem>
          </Accordion>

          <h4 className="m-3 text-sm font-semibold">Auto-Calculated Targets</h4>
            <div className="grid grid-cols-2 text-sm p-2 border-t">
              <span>Period</span>
              <span>Target Value</span>
            </div>
            <div className="grid grid-cols-2 text-sm p-2 border-t">
              <span>Annual</span>
              <span>3,514,346.25</span>
            </div>
            <div className="grid grid-cols-2 text-sm p-2 border-t">
              <span>Quarterly</span>
              <span></span>
            </div>
            <div className="grid grid-cols-2 text-sm p-2 border-t">
              <span>Weekly</span>
              <span></span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-4">
          <div></div>
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
          title="Targets" 
          data={targets} 
          columns={columns} 
          onEdit={handleEdit} 
          onAdd={handleAdd} 
          customRender={customRender} 
        />
      )}
    </div>
  );  
};

export default Target;
